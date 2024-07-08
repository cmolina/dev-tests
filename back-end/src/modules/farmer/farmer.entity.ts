import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Farmer {

  @PrimaryKey()
  id!: number

  @Property()
  firstName!: string

  @Property()
  lastName!: string

  @Property({ unique: true })
  email!: string

}
