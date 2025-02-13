import { Migration } from '@mikro-orm/migrations';

export class Migration20250205170352 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "movie";`);
    this.addSql(
      `create table "movie"."movie" ("id" serial primary key, "title" varchar(255) not null, "date" date not null, "genre" varchar(255) not null);`,
    );

    this.addSql(
      `create table "movie"."productor" ("id" serial primary key, "lastname" varchar(255) not null, "firstname" varchar(255) not null, "age" int not null, "now" boolean not null);`,
    );

    this.addSql(
      `create table "movie"."movie_productor" ("movie_id" int not null, "productor_id" int not null, constraint "movie_productor_pkey" primary key ("movie_id", "productor_id"));`,
    );

    this.addSql(
      `create table "movie"."actor" ("id" serial primary key, "start" date null, "end" timestamptz null, "lastname" varchar(255) not null, "firstname" varchar(255) not null, "country" varchar(255) not null, "productor_id" int not null);`,
    );

    this.addSql(
      `create table "movie"."movie_actor" ("movie_id" int not null, "actor_id" int not null, constraint "movie_actor_pkey" primary key ("movie_id", "actor_id"));`,
    );

    this.addSql(
      `alter table "movie"."movie_productor" add constraint "movie_productor_movie_id_foreign" foreign key ("movie_id") references "movie"."movie" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "movie"."movie_productor" add constraint "movie_productor_productor_id_foreign" foreign key ("productor_id") references "movie"."productor" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "movie"."actor" add constraint "actor_productor_id_foreign" foreign key ("productor_id") references "movie"."productor" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "movie"."movie_actor" add constraint "movie_actor_movie_id_foreign" foreign key ("movie_id") references "movie"."movie" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "movie"."movie_actor" add constraint "movie_actor_actor_id_foreign" foreign key ("actor_id") references "movie"."actor" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "movie"."actor" alter column "productor_id" drop not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "movie"."movie_productor" drop constraint "movie_productor_movie_id_foreign";`,
    );

    this.addSql(
      `alter table "movie"."movie_actor" drop constraint "movie_actor_movie_id_foreign";`,
    );

    this.addSql(
      `alter table "movie"."movie_productor" drop constraint "movie_productor_productor_id_foreign";`,
    );

    this.addSql(
      `alter table "movie"."actor" drop constraint "actor_productor_id_foreign";`,
    );

    this.addSql(
      `alter table "movie"."movie_actor" drop constraint "movie_actor_actor_id_foreign";`,
    );
  }
}
