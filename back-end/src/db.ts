import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
} from '@mikro-orm/sqlite'
import config from './mikro-orm.config.js'
import { Fruit } from './modules/fruit/fruit.entity.js'
import { Client } from './modules/client/client.entity.js'
import { Farmer } from './modules/farmer/farmer.entity.js'
import { Field } from './modules/field/field.entity.js'
import { Crop } from './modules/crop/crop.entity.js'

export interface Services {
  orm: MikroORM
  em: EntityManager
  fruit: EntityRepository<Fruit>
  client: EntityRepository<Client>
  farmer: EntityRepository<Farmer>
  field: EntityRepository<Field>
  crop: EntityRepository<Crop>
}

let cache: Services

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
  })

  return (cache = {
    orm,
    em: orm.em,
    fruit: orm.em.getRepository(Fruit),
    client: orm.em.getRepository(Client),
    farmer: orm.em.getRepository(Farmer),
    field: orm.em.getRepository(Field),
    crop: orm.em.getRepository(Crop),
  })
}
