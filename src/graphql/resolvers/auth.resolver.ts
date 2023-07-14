import {
  compare,
  createDataSource,
  hashedPassword,
  signToken,
} from "../../ultis";
import { AppDataSource } from "../../data-source";
import { SignInType, SignUpType } from "../types/auth";
import { GraphQLError } from "graphql";
import { User } from "../../entities/user.entity";
import { validateAuthInput } from "../validations";
import { AppConfig } from "../../config";

export const authResolvers = {
  Mutation: {
    signUp: async (_: any, arg: SignUpType) => {
      try {
        const { email, password, tenant_id } = arg;

        const tenant = `tenant_${tenant_id}`;

        await validateAuthInput({ email, password });

        await AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS "${tenant}"`);

        AppDataSource.setOptions({ schema: tenant });

        await AppDataSource.runMigrations();

        const dataSource = await createDataSource(tenant);

        const userRepository = dataSource.getRepository(User);

        const existUser = await userRepository.findOne({
          where: { email },
        });

        if (existUser) {
          throw new Error("User already exists");
        }

        const encryptedPassword = await hashedPassword(password);

        await userRepository.insert({
          email,
          role: "admin",
          password: encryptedPassword,
        });

        await dataSource.destroy();

        return "Create user successfully";
      } catch (error) {
        throw new GraphQLError(error as string);
      }
    },
    signIn: async (_: any, arg: SignInType) => {
      try {
        const { email, password, tenant_id } = arg;

        const tenant = `tenant_${tenant_id}`;

        await validateAuthInput({ email, password });

        const existSchema = await AppDataSource.query(
          `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${tenant}';`
        );

        if (!existSchema.length) {
          throw new Error("Tenant id not found");
        }

        const dataSource = await createDataSource(tenant);

        const userRepository = dataSource.getRepository(User);

        const existUser = await userRepository.findOne({ where: { email } });

        await dataSource.destroy();

        if (!existUser) {
          throw new Error("User is not exist");
        }

        const isMatchPassword = await compare(password, existUser.password);

        if (!isMatchPassword) {
          throw new Error("Password not match");
        }

        const accessToken = signToken(
          {
            id: existUser.id,
            email: existUser.email,
            role: existUser.role,
            tenant_id,
          },
          AppConfig.JWT_ACCESS_SECRET,
          { expiresIn: AppConfig.JWT_ACCESS_EXPIRE }
        );

        return accessToken;
      } catch (error) {
        throw new GraphQLError(error as string);
      }
    },
  },
  Query: {
    checkHealth: () => "OK",
  },
};
