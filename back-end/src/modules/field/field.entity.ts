import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { Farmer } from '../farmer/farmer.entity.js'

@Unique({ properties: ['name', 'location'] })
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
