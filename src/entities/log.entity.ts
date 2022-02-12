import { AppBaseEntity } from "./base.entity";
import { Column, Entity } from "typeorm";
import { LogType } from "../models/enum/log-type.enum";

@Entity({ name: "logs" })
export class LogEntity extends AppBaseEntity {
  @Column({
    length: 255,
    type: "varchar",
  })
  logType!: LogType;

  @Column({
    length: 255,
  })
  message!: string;
}
