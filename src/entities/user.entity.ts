import { AppBaseEntity } from "./base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends AppBaseEntity {
  @Column({
    unique: true,
    length: 255,
  })
  email!: string;

  @Column({
    default: false,
  })
  verified!: boolean;

  @Column({
    default: "",
    nullable: true,
    length: 512,
  })
  hash!: string;

  @Column({
    default: false,
  })
  isBanned!: boolean;

  @Column({
    default: "",
    nullable: true,
    length: 255,
  })
  banReason!: string;

  // This also updates anytime a token is refreshed.
  @Column({ type: "timestamp", nullable: true })
  lastLogin!: Date;
}
