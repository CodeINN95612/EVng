import express from 'express';
import { authRouter } from '@/features/auth/auth.routes';
import { authenticationMiddleware } from './middlewares/authentication.middleware';

export const apiRouter = express.Router();

apiRouter.use(authenticationMiddleware);

apiRouter.use('/auth', authRouter);

apiRouter.get('/health-private', (req, res) => {
  res.json({
    message: 'This is a private endpoint',
    userId: res.locals.userId,
  });
});
