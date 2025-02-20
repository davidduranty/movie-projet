import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Actor } from './actor.entity';
import { Movie } from './movie.entity';

@Entity({ schema: 'movie' })
class Productor extends BaseEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ApiProperty({
    description: 'Nom du producteur',
    example: 'Speilberg',
  })
  @Property({ type: 'string' })
  lastname: string;

  @ApiProperty({
    description: 'Prénom du producteur',
    example: 'Steven',
  })
  @Property({ type: 'string' })
  firstname: string;
  @ApiProperty({
    description: 'Son age',
    example: '70',
  })
  @Property({ type: 'number' })
  age: number;

  @ApiProperty({
    description: ' Vivant',
    example: true,
  })
  @Property({ type: 'boolean' })
  now: boolean;

  @OneToMany(() => Actor, (event) => event.productor, { eager: false })
  actors = new Collection<Actor>(this);

  @ManyToMany({ entity: () => Movie, mappedBy: 'productor', eager: false })
  dataMovies = new Collection<Movie>(this);

  // toJSON() {
  //   return {
  //     id: this.id,
  //     lastname: this.lastname,
  //     firstname: this.firstname,
  //     age: this.age,
  //     now: this.now,
  //     actors: this.actors.getIdentifiers(), // Renvoie juste les IDs des acteurs
  //     dataMovies: this.dataMovies.getIdentifiers(), // Renvoie juste les IDs des films
  //   };
  // }
}

export { Productor };
