import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Client } from '../client/client.entity.js'
import { Fruit } from '../fruit/fruit.entity.js'
import { Field } from '../field/field.entity.js'

@Entity()
export class Crop {

  @PrimaryKey()
  id!: number

  @ManyToOne()
  client!: Client

  @ManyToOne()
  fruit!: Fruit

  @ManyToOne()
  field!: Field

}
