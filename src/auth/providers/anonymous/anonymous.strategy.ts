import { Strategy } from 'passport-anonymous';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// https://www.passportjs.org/packages/passport-anonymous/

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super();
	}
}
