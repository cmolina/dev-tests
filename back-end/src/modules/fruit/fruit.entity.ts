import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core'

@Unique({ properties: ['name', 'variety'] })
@Entity()
export class Fruit {

  @PrimaryKey()
  id!: number

  @Property()
  name!: string

  @Property()
  variety!: string

}
