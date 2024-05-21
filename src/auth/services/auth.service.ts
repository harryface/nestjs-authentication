import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { ChangePasswordDto, signInDto, signUpDto } from '../auth.dto';
import { PasswordService } from './password.service';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export class Token {
	accessToken: string;
	refreshToken: string;
}

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private passwordService: PasswordService,
		private configService: ConfigService
	) {}

	async registerUser(payload: signUpDto): Promise<Token> {
		let hashedPassword = null;
		if ('password' in payload) {
			hashedPassword = await this.passwordService.hashPassword(
				payload.password
			);
		}

		try {
			const user = await this.usersService.createUser({
				...payload,
				password: hashedPassword
			});

			return this.generateTokens({
				userEmail: user.email
			});
		} catch (e) {
			if (e instanceof UniqueConstraintError) {
				throw new ConflictException(`Email ${payload.email} already used.`);
			}
			if (e instanceof ValidationError) {
				throw new BadRequestException(e.errors[0].message);
			}
			throw new Error(e);
		}
	}

	generateTokens(payload: { userEmail: string }): Token {
		return {
			accessToken: this.generateAccessToken(payload),
			refreshToken: this.generateRefreshToken(payload)
		};
	}

	private generateAccessToken(payload: { userEmail: string }): string {
		return this.jwtService.sign(payload);
	}

	private generateRefreshToken(payload: { userEmail: string }): string {
		const refreshIn = this.configService.get('JWT_EXPIRES_IN');
		return this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_REFRESH_SECRET'),
			expiresIn: refreshIn
		});
	}

	refreshToken(token: string) {
		try {
			const { userEmail } = this.jwtService.verify(token, {
				secret: this.configService.get('JWT_REFRESH_SECRET')
			});

			return this.generateTokens({
				userEmail
			});
		} catch (e) {
			throw new UnauthorizedException();
		}
	}

	async validateUser(email: string): Promise<any | null> {
		const user = await this.usersService.findUser(email);
		if (user && user.isActive) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(login_data: signInDto): Promise<Token> {
		const exception = new NotFoundException(
			'Error: Your email or password is invalid'
		);
		const user = await this.usersService.findUser(login_data.identifier);

		if (!user) {
			throw exception;
		}

		const passwordValid = await this.passwordService.validatePassword(
			login_data.password,
			user.password
		);

		if (!passwordValid) {
			throw exception;
		}

		return this.generateTokens({
			userEmail: user.email
		});
	}

	async changePassword(userId: string, passwordData: ChangePasswordDto) {
		const user = await this.usersService.findUser(userId);
		const passwordValid = await this.passwordService.validatePassword(
			passwordData.oldPassword,
			user.password
		);

		if (!passwordValid) {
			throw new BadRequestException('Invalid password');
		}

		const hashedPassword = await this.passwordService.hashPassword(
			passwordData.newPassword
		);

		return this.usersService.updateUser({ password: hashedPassword }, user);
	}
}
