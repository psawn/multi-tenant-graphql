import { AppDataSource } from "../../data-source";
import { SignUpType } from "../types/auth";

export const authResolvers = {
  Mutation: {
    signUp: async (_: any, arg: SignUpType) => {
      try {
        const { email, password, tenant_id } = arg;

        await AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS "${tenant_id}"`);

        AppDataSource.setOptions({ schema: tenant_id });

        await AppDataSource.runMigrations();
      } catch (error) {
        //
      }
    },
  },
  Query: {
    checkHealth: () => "OK",
  },
};
