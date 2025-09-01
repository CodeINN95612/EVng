import { Request, Response, NextFunction } from 'express';
import { Locals } from '@/types/locals';
import { jwtHandler } from '@/features/common/jwtHandler';

export const authenticationMiddleware = (
  req: Request,
  res: Response<any, Locals>,
  next: NextFunction,
) => {
  // Skip authentication for /auth routes
  if (req.path.startsWith('/auth')) {
    return next();
  }

  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and follows Bearer format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // Extract the token (remove 'Bearer ' prefix)
  const token = authHeader.substring(7);

  // Validate the token using jwtHandler
  const payload = jwtHandler.isTokenValid(token);
  if (!payload || !payload.valid) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  res.locals.userId = payload.userId;

  // Token is valid, proceed to next middleware/route handler
  next();
};
