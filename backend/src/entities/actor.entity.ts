import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { Movie } from "./movie.entity";
import { Productor } from "./productor.entity";

@Entity({ schema: 'movie' })
class Actor {

    @PrimaryKey()
    id!: number;

    @ApiProperty({
        description: "Nom de l'acteur",
        example: " Doe"
    })
    @Property()
    lastname: string;

    @ApiProperty({
        description: "Prénom de l'acteur",
        example: "John"
    })
    @Property()
    firstname: string;
    @ApiProperty({
        description: "Date de naissance de l'acteur",
        example: "1990-01-01"
    })
    @Property({type: "date"})
    birthdate: Date;

    @ApiProperty({
        description: "Pays",
        example: "USA"
    })
    @Property()
    country: string;

    @ManyToOne(() => Productor)
    productor?: Productor;

    @ManyToMany({ entity: () => Movie, mappedBy: 'actor' })
    dataMovies = new Collection<Movie>(this);
}

export {Actor}