import express from 'express';
import { authRouter } from '@/features/auth/auth.routes';
import { authenticationMiddleware } from '@/middlewares/authentication.middleware';
import { eventsRouter } from '@/features/events/events.routes';

export const apiRouter = express.Router();

apiRouter.use(authenticationMiddleware);

apiRouter.use('/auth', authRouter);
apiRouter.use('/events', eventsRouter);

apiRouter.get('/health-private', (req, res) => {
  res.json({
    message: 'This is a private endpoint',
  });
});
