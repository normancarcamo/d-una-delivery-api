import bcrypt from 'bcryptjs';
import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import _ from 'lodash';
import User from '../../models/user';
import { userRegisterSchema, userLoginSchema } from './validations';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from './jwt_helpers';
import fff from '../../redis-connection';

const router = express.Router();

router.post('/register', async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userRegisterSchema.validateAsync(req.body);
    const exists = await User.findOne({ email: data.email });

    if (exists) {
      throw new createError.Conflict(`${data.email} is already registered`);
    }

    const password = await bcrypt.hash(data.password, 12);
    const newUser = new User({ ...data, password });
    const userSaved: any = await newUser.save();

    const user = _.pick(userSaved.toJSON(), '_id', 'name', 'email');
    const id = user._id.toString();

    const access_token = await signAccessToken(id, user);
    const refresh_token = await signRefreshToken(id);

    res.send({ access_token, refresh_token });
  } catch (error) {
    if (error.isJoi) {
      next(new createError.BadRequest('Invalid data'));
    } else {
      next(error);
    }
  }
});

router.post('/login', async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await userLoginSchema.validateAsync(req.body);


    const userFound: any = await User.findOne({ email });
    if (!userFound) {
      throw new createError.NotFound('User not registered');
    }

    const userMatch: any = await bcrypt.compare(password, userFound.password);
    if (!userMatch) {
      throw new createError.Forbidden();
    }

    const user = _.pick(userFound.toJSON(), '_id', 'name', 'email');
    const id = user._id.toString();

    const access_token = await signAccessToken(id, user);
    const refresh_token = await signRefreshToken(id);

    res.send({ access_token, refresh_token });
  } catch (error) {
    if (error.isJoi) {
      next(new createError.BadRequest('Invalid email/password'));
    } else {
      next(error);
    }
  }
});

router.delete('/logout', (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  res.send('logout ok');
});

router.post('/recover-password', (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('recover-password ok');
});

router.post('/refresh-token', async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.refreshToken) {
      throw new createError.BadRequest();
    }

    const userId = await verifyRefreshToken(req.body.refreshToken) as string;
    const userFound = await User.findOne({ _id: userId });

    if (!userFound) {
      throw new createError.Forbidden();
    }

    const user = _.pick(userFound.toJSON(), '_id', 'name', 'email');

    const access_token = await signAccessToken(userId, user);
    const refresh_token = await signRefreshToken(userId);

    res.send({ access_token, refresh_token });
  } catch (err) {
    next(err);
  }
});

export default router;
