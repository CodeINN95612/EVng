import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  env: string;

  mongo_uri: string;
  redis_uri: string;

  jwt_secret: string;
  jwt_issuer: string;
  jwt_audience: string;
  jwt_expiration_minutes: number;
}

const generateConfig = (): Config => {
  const requiredEnvVar = (name: string, value: string | undefined): string => {
    if (!value) throw new Error(`${name} is not defined`);
    return value;
  };

  return {
    port: Number(process.env.PORT) || 3000,
    env: process.env.NODE_ENV || 'development',

    mongo_uri: requiredEnvVar('MONGO_URI', process.env.MONGO_URI),
    redis_uri: requiredEnvVar('REDIS_URI', process.env.REDIS_URI),

    jwt_secret: requiredEnvVar('JWT_SECRET', process.env.JWT_SECRET),
    jwt_issuer: requiredEnvVar('JWT_ISSUER', process.env.JWT_ISSUER),
    jwt_audience: requiredEnvVar('JWT_AUDIENCE', process.env.JWT_AUDIENCE),
    jwt_expiration_minutes: Number(
      requiredEnvVar(
        'JWT_EXPIRATION_MINUTES',
        process.env.JWT_EXPIRATION_MINUTES,
      ),
    ),
  };
};

const config = generateConfig();

export default config;
