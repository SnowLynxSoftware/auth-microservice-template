import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Common fields that all entities should have.
 */
export class AppBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created!: Date;

  @UpdateDateColumn({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  lastModified!: Date;

  @Column({ type: "timestamp", nullable: true })
  archivedAt!: Date;
}
