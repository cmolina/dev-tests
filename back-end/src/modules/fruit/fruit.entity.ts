import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Fruit {

  @PrimaryKey()
  id!: number

  @Property()
  name!: string

}
