import "dotenv/config";
import Joi from "joi";

const schema = Joi.object({
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRE: Joi.string().required(),
  PORT: Joi.number().required().default(4000),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().required().default(5432),
});

export const AppConfig = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE!,
  PORT: +process.env.PORT!,
  DB_HOST: process.env.DB_HOST!,
  DB_USERNAME: process.env.DB_USERNAME!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  DB_PORT: +process.env.DB_PORT!,
};

export async function validateEnv() {
  try {
    await schema.validateAsync(AppConfig);
  } catch (error) {
    throw new Error(error as string);
  }
}
