import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
} from '@mikro-orm/sqlite'
import config from './mikro-orm.config.js'
import { Fruit } from './modules/fruit/fruit.entity.js'
import { Variety } from './modules/variety/variety.entity.js'
import { Client } from './modules/client/client.entity.js'
import { Farmer } from './modules/farmer/farmer.entity.js'

export interface Services {
  orm: MikroORM
  em: EntityManager
  fruit: EntityRepository<Fruit>
  variety: EntityRepository<Variety>
  client: EntityRepository<Client>
  farmer: EntityRepository<Farmer>
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
    variety: orm.em.getRepository(Variety),
    client: orm.em.getRepository(Client),
    farmer: orm.em.getRepository(Farmer),
  })
}
