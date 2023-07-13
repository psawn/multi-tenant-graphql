import { MigrationInterface, QueryRunner } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class migrate1687923772313 implements MigrationInterface {
  name = `migrate${new Date().getTime()}`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(
      `
      CREATE TABLE IF NOT EXISTS "${schema}"."users" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        role VARCHAR(255) DEFAULT 'user',
      );
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
