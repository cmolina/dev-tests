import { defineConfig } from '@mikro-orm/sqlite'
import { SqliteDriver } from '@mikro-orm/sqlite'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Migrator } from '@mikro-orm/migrations'

export default defineConfig({
  driver: SqliteDriver,
  dbName: 'sqlite.db',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  dynamicImportProvider: id => import(id),
  extensions: [Migrator],
})
