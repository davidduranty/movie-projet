import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { Actor } from "./actor.entity";
import { Movie } from "./movie.entity";

@Entity({schema: 'movie'})
class Productor {
    @PrimaryKey()
    id: string

    @ApiProperty({
        description: "Nom du producteur",
        example: "Speilberg"
    })
    @Property()
    lastname: string
    @ApiProperty({
        description: "Prénom du producteur",
        example: "Steven"
    })
    @Property()
    firstname: string
    @ApiProperty({
        description: "Son age",
        example: "70"
    })
    @Property()
    age: number
    @ApiProperty({
        description: " Vivant",
        example: true
    })
    @Property()
    now: boolean
    @OneToMany(() => Actor, event => event.lastname)
    actor = new Collection<Actor>(this)

    // @OneToMany(() => Movie, event => event.title)
    // movie = new Collection<Movie>(this)
}

export {Productor}