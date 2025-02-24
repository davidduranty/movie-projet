import { Migration } from '@mikro-orm/migrations';

export class Migration20250219104050 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "movie"."actor" drop constraint "actor_productor_id_foreign";`);

    this.addSql(`alter table "movie"."actor" alter column "end" type varchar(255) using ("end"::varchar(255));`);
    this.addSql(`alter table "movie"."actor" alter column "productor_id" type int using ("productor_id"::int);`);
    this.addSql(`alter table "movie"."actor" alter column "productor_id" drop not null;`);
    this.addSql(`alter table "movie"."actor" add constraint "actor_productor_id_foreign" foreign key ("productor_id") references "movie"."productor" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "movie"."actor" drop constraint "actor_productor_id_foreign";`);

    this.addSql(`alter table "movie"."actor" alter column "end" type timestamptz using ("end"::timestamptz);`);
    this.addSql(`alter table "movie"."actor" alter column "productor_id" type int using ("productor_id"::int);`);
    this.addSql(`alter table "movie"."actor" alter column "productor_id" set not null;`);
    this.addSql(`alter table "movie"."actor" add constraint "actor_productor_id_foreign" foreign key ("productor_id") references "movie"."productor" ("id") on update cascade;`);
  }

}
