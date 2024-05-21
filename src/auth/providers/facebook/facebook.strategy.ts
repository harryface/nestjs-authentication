import { Profile, Strategy } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../services/auth.service';

// https://www.passportjs.org/packages/passport-facebook/
// https://dev.to/elishaking/how-to-implement-facebook-login-with-nestjs-90h

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
	constructor(
		private authService: AuthService,
		private configService: ConfigService
	) {
		super({
			clientID: configService.get('FACEBOOK_CLIENT_ID'),
			clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
			callbackURL: 'http://localhost:3001/api/auth/google/redirect',
			scope: 'email',
			profileFields: ['id', 'displayName', 'photos', 'email'],
			enableProof: true
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (err: any, user: any, info?: any) => void
	): Promise<any> {
		const { name, username, displayName, emails, birthday } = profile;
		const userPayload = {
			email: emails[0].value,
			userName: (username || displayName) + Date.now().toString(36),
			firstName: name.givenName,
			lastName: name.familyName,
			birthDate: birthday
		};
		const payload = {
			userPayload,
			accessToken
		};
		let user = await this.authService.validateUser(emails[0].value);
		if (!user) {
			// create the user
			user = await this.authService.registerUser(userPayload);
		}

		done(null, payload);
		return user || null;
	}
}
