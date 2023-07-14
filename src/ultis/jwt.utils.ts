import jwt from "jsonwebtoken";
import "dotenv/config";

export function signToken(
  payload: Object,
  privatekey: string,
  options: jwt.SignOptions
) {
  return jwt.sign(payload, privatekey, options);
}
