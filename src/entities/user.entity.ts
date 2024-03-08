import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  status: string;

}