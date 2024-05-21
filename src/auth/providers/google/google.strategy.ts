import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../../services/auth.service';

// https://www.passportjs.org/packages/passport-google-oauth20/

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private authService: AuthService,
		private configService: ConfigService
	) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
			callbackURL: 'http://localhost:3001/api/auth/google/redirect',
			scope: ['profile', 'email', 'name']
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		const { name, username, displayName, emails, _json } = profile;
		const { sub, given_name, family_name } = _json;
		const userPayload = {
			email: emails[0].value,
			userName:
				(username || displayName || given_name + family_name) +
				Date.now().toString(36),
			firstName: name.givenName || given_name,
			lastName: name.familyName || family_name,
			subId: sub
		};
		let user = await this.authService.validateUser(userPayload.email);
		if (!user) {
			// create the user
			user = await this.authService.registerUser(userPayload);
		}

		return user || null;
	}
}
