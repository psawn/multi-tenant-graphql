import Joi from "joi";
import { AppConfig } from "../../config";

export async function validateAuthInput(input: {
  email: string;
  password: string;
}) {
  const schema = Joi.object({
    email: Joi.string().pattern(new RegExp(AppConfig.EMAIL_REGEX)).required(),
    password: Joi.string()
      .pattern(new RegExp(AppConfig.PASSWORD_REGEX))
      .required(),
  });

  try {
    await schema.validateAsync(input);
  } catch (error) {
    throw new Error(error as string);
  }
}
