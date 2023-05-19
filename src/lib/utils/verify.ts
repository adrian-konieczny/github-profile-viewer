import { verify } from "jsonwebtoken";

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
