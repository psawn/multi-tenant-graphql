import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true, default: "" })
  role!: string;
}
