import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Model as User } from './models/user';

export function notFound (req: Request, res: Response, next: NextFunction) {
  next(new createError.NotFound());
}

export function notAllowed (req: Request, res: Response, next: NextFunction) {
  next(new createError.MethodNotAllowed());
}

export function error(
  err: Error & { status?: number; },
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status = 500, message } = err;
  res.status(status).json({ error: { status, message } });
}

export const validateToken = (jsonwebtoken: any) => async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh-token'
  ];

  if (publicRoutes.includes(req.url)) {
    return next();
  }

  let token = req.headers.authorization as string;

  if (!token) {
    return next(new createError.Unauthorized());
  }

  if (!token.startsWith('Bearer ')) {
    return next(new createError.Unauthorized());
  }

  token = token.split(' ')[1];

  if (!token) {
    return next(new createError.Unauthorized());
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const payload = jsonwebtoken.verify(token, secret);
    req.user = await User.findOne({ _id: payload.aud });
    if (!req.user) {
      next(new createError.Unauthorized());
    } else {
      next();
    }
  } catch (error) {
    const message = error.name === 'JsonWebTokenError'
      ? undefined
      : error.message;
    return next(new createError.Unauthorized(message));
  }
};
