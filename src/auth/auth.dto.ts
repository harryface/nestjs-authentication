export class SignInDto {
  identifier: string;
  password: string;
}

export class SignUpDto {
  email: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string | Date;
  pic?: string;
  phone?: number;
  pronoun?: 'he/him' | 'she/her' | 'they/them' | 'ze/hir' | 'other' = 'other';
  countryCode?: string;
  password?: string;
}

export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export class JwtDto {
  userEmail: string;
  iat: number;
  exp: number;
}

export class RefreshTokenDto {
  token: string;
}
