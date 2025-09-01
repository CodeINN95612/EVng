import { IUser } from '@/database/schema/user';
import jwt from 'jsonwebtoken';
import config from '@/config/config';

type Payload =
  | {
      valid: true;
      userId: string;
    }
  | { valid: false };

const jwtHandler = {
  generateForUser: (user: IUser) => {
    return jwt.sign(
      {
        id: user.id,
        sub: user.username,
        email: user.email,
      },
      config.jwt_secret,
      {
        expiresIn: config.jwt_expiration_minutes * 60, // in seconds
        issuer: config.jwt_issuer,
        audience: config.jwt_audience,
      },
    );
  },

  isTokenValid: (token: string) => {
    try {
      const payload = jwt.verify(token, config.jwt_secret, {
        issuer: config.jwt_issuer,
        audience: config.jwt_audience,
      }) as jwt.JwtPayload;

      const data = {
        valid: true,
        userId: payload['id'],
      } satisfies Payload;

      return data;
    } catch (error) {
      console.log('Invalid JWT token received: ', error);
      return { valid: false } satisfies Payload;
    }
  },
};

export { jwtHandler };
