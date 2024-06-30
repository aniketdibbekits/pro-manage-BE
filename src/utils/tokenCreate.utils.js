import jwt from "jsonwebtoken";
export const createToken = (obj) => {
  return jwt.sign(obj, process.env.SECRET_KEY);
};
