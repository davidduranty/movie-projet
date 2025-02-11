import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { Productor } from "./productor.entity";
import { Actor } from "./actor.entity";

@Entity({schema: 'movie'})
class Movie {
    @PrimaryKey({autoincrement: true}) id!: number;

    @ApiProperty({
        description: "Nom du film",
        example: "Indiana Jones"
    })
    @Property({type: "string"})
    title: string;

    @ApiProperty({
        description: "Année de sortie du film",
        example: "1984"
    })
    @Property({type: "date"})
    date: Date;

    @ApiProperty({
        description: "Genre du film",
        example: "Aventure"
    })
    @Property({type: "string"})
    genre: string;

    @ManyToMany({ entity: () => Actor, serializer: value => value, serializedName: 'actor'})
    actor: Collection<Actor> = new Collection<Actor>(this)
    
    @ManyToMany({ entity:() => Productor, serializer: value => value, serializedName: 'productor'})
    productor: Collection<Productor> = new Collection<Productor>(this)
}

export { Movie}