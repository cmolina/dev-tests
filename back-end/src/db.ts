import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
} from '@mikro-orm/sqlite'
import config from './mikro-orm.config.js'
import { Fruit } from './modules/fruit/fruit.entity.js'

export interface Services {
  orm: MikroORM
  em: EntityManager
  fruit: EntityRepository<Fruit>
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
  })
}
