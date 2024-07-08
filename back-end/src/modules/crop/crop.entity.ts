import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { Client } from '../client/client.entity'
import { Fruit } from '../fruit/fruit.entity'
import { Variety } from '../variety/variety.entity'
import { Field } from '../field/field.entity'

@Entity()
export class Crop {

  @PrimaryKey()
  id!: number

  @ManyToOne()
  client!: Client

  @ManyToOne()
  fruit!: Fruit

  @ManyToOne()
  variety!: Variety

  @ManyToOne()
  field!: Field

}
