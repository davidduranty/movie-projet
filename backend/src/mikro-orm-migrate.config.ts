
import  { config } from './mikro-orm.config';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations'
 

 
const migrationConfig = {
  ...config,
  entities: ['backend/src/**/*.entity.ts'],
  extensions: [Migrator],
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: 'dist/migrations', // path to the folder with migrations
    pathTs: 'backend/src/migrations', // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: false, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  }
}
// eslint-disable-next-line import-x/no-default-export
export default migrationConfig