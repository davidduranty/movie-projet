import { DateType, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: DateType, nullable: true })
  start?: Date | null;

  @Property({ onUpdate: () => new Date(), nullable: true })
  end?: Date | null;
}
