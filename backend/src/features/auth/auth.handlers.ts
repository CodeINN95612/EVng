import { Request, Response } from 'express';
import {
  RegisterRequest,
  RegisterUserDto,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RefreshRequest,
} from '@/features/auth/auth.types';
import { passwordHasher } from '@/features/auth/common/passwordHasher';
import authRepository from '@/features/auth/auth.repository';
import { jwtHandler } from '../common/jwtHandler';
import { tokenGenerator } from '../common/tokenGenerator';
import config from '@/config/config';

const refreshTokenLength = 32;

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body as RegisterRequest;

  const [passwordHash, salt] = await passwordHasher.hash(password);

  const userDto: RegisterUserDto = {
    email,
    username,
    passwordHash,
    salt,
  };

  const userExistsByEmail = await authRepository.findUserByEmail(email);

  if (userExistsByEmail) {
    return res.status(409).json({ message: 'User already exists' });
  }

  await authRepository.createUser(userDto);

  res.status(201).send();
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginRequest;

  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await passwordHasher.verify(
    password,
    user.passwordHash,
    user.salt,
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwtHandler.generateForUser(user);

  const refreshToken = tokenGenerator.generate(refreshTokenLength);
  const expiresAt = new Date(
    Date.now() + config.refresh_token_expiration_days * 24 * 60 * 60 * 1000,
  );

  await authRepository.addRefreshTokenToUser(user.id, refreshToken, expiresAt);

  let result: LoginResponse = {
    token,
    refreshToken,
  };

  res.status(200).json(result);
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body as RefreshRequest;

  const oldToken = await authRepository.getRefreshToken(refreshToken);

  console.log('Old refresh token:', oldToken);

  if (!oldToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  if (oldToken.expiresAt < new Date()) {
    return res.status(401).json({ message: 'Refresh token expired' });
  }

  const user = await authRepository.findUserByRefreshToken(refreshToken);

  if (!user) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const newJwt = jwtHandler.generateForUser(user);
  const newToken = tokenGenerator.generate(refreshTokenLength);
  const expiresAt = new Date(
    Date.now() + config.refresh_token_expiration_days * 24 * 60 * 60 * 1000,
  );

  await authRepository.deleteRefreshToken(refreshToken);
  await authRepository.addRefreshTokenToUser(user.id, newToken, expiresAt);

  const response = {
    token: newJwt,
    refreshToken: newToken,
  } satisfies RefreshResponse;

  res.status(200).json(response);
};
