import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Farmer } from '../farmer/farmer.entity'

@Entity()
export class Field {

  @PrimaryKey()
  id!: number

  @Property()
  name!: string

  @Property()
  location!: string

  @ManyToOne()
  farmer!: Farmer

}
