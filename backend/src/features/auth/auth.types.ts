export type RegisterRequest = {
  email: string;
  username: string;
  password: string;
};

export type RegisterUserDto = {
  email: string;
  username: string;
  passwordHash: string;
  salt: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = {
  token: string;
  refreshToken: string;
};
