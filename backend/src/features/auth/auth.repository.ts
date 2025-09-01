import { RefreshToken } from '@/database/schema/refreshToken';
import { User } from '@/database/schema/user';
import { RegisterUserDto } from '@/features/auth/auth.types';

const authRepository = {
  createUser: async (user: RegisterUserDto) => {
    try {
      const newUser = new User({
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash,
        salt: user.salt,
        refreshTokens: [],
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error: any) {
      console.error('Database Error in createUser:', error);

      // Handle specific MongoDB errors
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        throw new Error(`${duplicateField} already exists`);
      }

      throw error;
    }
  },

  findUserByEmail: async (email: string) => {
    try {
      return await User.findOne({ email: email.toLowerCase() });
    } catch (error) {
      console.error('Database Error in findUserByEmail:', error);
      throw error;
    }
  },

  getRefreshToken: async (token: string) => {
    try {
      const userRefreshToken = await User.findOne(
        {
          refreshTokens: {
            $elemMatch: {
              token: token,
            },
          },
        },
        {
          'refreshTokens.$': 1,
        },
      );
      return userRefreshToken?.refreshTokens[0];
    } catch (error) {
      console.error('Database Error in getUserRefreshToken:', error);
      throw error;
    }
  },

  addRefreshTokenToUser: async (
    userId: string,
    token: string,
    expiresAt: Date,
  ) => {
    try {
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            refreshTokens: {
              token,
              expiresAt,
            },
          },
        },
        { new: true },
      );
    } catch (error) {
      console.error('Database Error in addRefreshTokenToUser:', error);
      throw error;
    }
  },

  deleteRefreshToken: async (token: string) => {
    try {
      await RefreshToken.deleteOne({ token });
    } catch (error) {
      console.error('Database Error in deleteRefreshToken:', error);
      throw error;
    }
  },

  findUserByRefreshToken: async (token: string) => {
    try {
      return await User.findOne({ 'refreshTokens.token': token });
    } catch (error) {
      console.error('Database Error in findUserByRefreshToken:', error);
      throw error;
    }
  },
};

export default authRepository;
