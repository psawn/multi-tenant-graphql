import { AppConfig } from "../config";
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

export async function createDataSource(schema: string) {
  const dataSource = new DataSource({
    type: "postgres",
    host: AppConfig.DB_HOST,
    username: AppConfig.DB_USERNAME,
    password: AppConfig.DB_PASSWORD,
    database: AppConfig.DB_NAME,
    port: AppConfig.DB_PORT,
    synchronize: false,
    migrationsRun: false,
    entities: ["dist/entities/**/*.js"],
    migrations: ["dist/migrations/tenant/**/*.js"],
    schema,
  });

  await dataSource.initialize();

  return dataSource;
}

// export async function createRepository<T extends ObjectLiteral>(
//   schema: string,
//   target: EntityTarget<T>
// ) {
//   const dataSource = await createDataSource(schema);

//   return dataSource.getRepository(target);
// }
