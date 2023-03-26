import jwt, { type JwtPayload } from 'jsonwebtoken';

export const signToken = (payload: JwtPayload) => {
  const signedToken = jwt.sign(payload, process.env.JWT_SECRET as string);
  return signedToken;
};

export const verifyToken = <T>(token: string | undefined) => {
  if (!token) return null;
  return jwt.verify(token, process.env.JWT_SECRET as string) as T;
};
