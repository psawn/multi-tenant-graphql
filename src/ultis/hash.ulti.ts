import bcrypt from "bcrypt";

export async function hashedPassword(data: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(data, salt);
}

export async function compare(data: string, encrypted: any) {
  return bcrypt.compareSync(data, encrypted);
}
