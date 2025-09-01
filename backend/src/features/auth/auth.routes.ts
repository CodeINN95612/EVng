import express from 'express';
import { login, refresh, register } from '@/features/auth/auth.handlers';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);

export { authRouter };
