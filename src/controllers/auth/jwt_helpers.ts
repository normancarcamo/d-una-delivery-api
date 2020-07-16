import createError from 'http-errors';
import jsonwebtoken from 'jsonwebtoken';

export const signAccessToken = async (_id: string, payload: any) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const options = { expiresIn: '1h', issuer: 'xelex.co', audience: _id };
    jsonwebtoken.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(new createError.InternalServerError())
      } else {
        resolve(token);
      }
    });
  });
}

export const signRefreshToken = async (_id: string) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    const options = { expiresIn: '1y', issuer: 'xelex.co', audience: _id };
    jsonwebtoken.sign({}, secret, options, (err, token) => {
      if (err) {
        reject(new createError.InternalServerError())
      } else {
        resolve(token);
      }
    });
  });
}

export const verifyRefreshToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.REFRESH_TOKEN_SECRET as string;
    jsonwebtoken.verify(token, secret, (err, payload: any) => {
      if (err) {
        reject(new createError.Unauthorized())
      } else {
        resolve(payload.aud);
      }
    });
  });
}
