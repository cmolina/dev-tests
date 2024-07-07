import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Variety {

  @PrimaryKey()
  id!: number

  @Property()
  name!: string

}
