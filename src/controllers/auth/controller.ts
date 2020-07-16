import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import User from '../../models/user';
import { userRegisterSchema } from './validations';

export const registerUser = async (req, res) => {
  const data = await userRegisterSchema.validateAsync(req.body);
  const exists = await User.findOne({ email: data.email });

  if (exists) {
    throw new createError.Conflict(`${data.email} is already registered`);
  }

  const password = await bcrypt.hash(data.password, 12);
  const newUser = new User({ ...data, password });
  const user = await newUser.save();

  res.json(user);
};
