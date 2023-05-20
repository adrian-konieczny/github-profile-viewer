import Bcrypt from "bcrypt";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const hash = (password: string) => {
  return Bcrypt.hash(password, SALT_ROUNDS);
};

export const compare = (password: string, hash: string) => {
  return Bcrypt.compare(password, hash);
};
