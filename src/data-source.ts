import { DataSource } from "typeorm";
import { AppConfig } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: AppConfig.DB_HOST,
  username: AppConfig.DB_USERNAME,
  password: AppConfig.DB_PASSWORD,
  database: AppConfig.DB_NAME,
  port: AppConfig.DB_PORT,
  synchronize: false,
  migrationsRun: false,
  entities: ["dist/entities/**/*.js"],
  migrations: ["dist/migrations/company/**/*.js"],
});
