import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {

  @PrimaryKey()
  id!: number;

  @Property()
    start = new Date();

  @Property({ onUpdate: () => new Date() })
    end = new Date();

}