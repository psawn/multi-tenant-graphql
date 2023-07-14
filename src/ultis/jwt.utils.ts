import jwt from "jsonwebtoken";
import "dotenv/config";

export function signToken(
  payload: Object,
  privatekey: string,
  options: jwt.SignOptions
) {
  return jwt.sign(payload, privatekey, options);
}

export function getUser(token: string) {
  const jwtToken = token.split(" ")[1];

  const payload = decodeToken(jwtToken);

  return {
    id: payload?.id,
    email: payload?.email,
    role: payload?.role,
  };
}

export function decodeToken(jwtToken: string) {
  return jwt.decode(jwtToken) as jwt.JwtPayload;
}
