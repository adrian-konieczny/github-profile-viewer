import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import cookie from "cookie";

type VerifyAuthProps = {
  token?: string;
};

type JWTPayload = {
  email: string;
};
export const verifyAuth = ({ token }: VerifyAuthProps) => {
  const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;
  if (JWT_TOKEN_KEY && token) {
    try {
      const { email } = verify(token, JWT_TOKEN_KEY) as JWTPayload;
      return { email };
    } catch (err) {
      return { email: null, error: err };
    }
  }
  return { email: null };
};

export const createToken = (params: any) => {
  const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;
  if (JWT_TOKEN_KEY) {
    const token = jwt.sign({ ...params }, JWT_TOKEN_KEY, {
      expiresIn: "1d",
    });
    return token;
  } else {
    const token = "";
    return token;
  }
};

export const createAuthCookie = (token: string) => {
  return cookie.serialize("token", token, {
    httpOnly: true,
    maxAge: 60 * 60,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });
};

export const clearAuthCookie = () => {
  return cookie.serialize("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });
};
