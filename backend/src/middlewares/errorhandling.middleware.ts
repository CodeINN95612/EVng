import { Request, Response, NextFunction } from 'express';

export const errorHandlingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    next();
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
