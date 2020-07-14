import { Request, Response, NextFunction } from 'express';

export function notFound (req: Request, res: Response, next: NextFunction) {
  throw new Error('Not found.');
}

export function notAllowed (req: Request, res: Response, next: NextFunction) {
  throw new Error('Method Not allowed.');
}

interface ErrorType extends Error {
  status?: number;
  reason?: string;
}

export function error(
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 400;
  res.status(status).json({
    error: err.message,
    reason: err.reason,
    status
  });
}
