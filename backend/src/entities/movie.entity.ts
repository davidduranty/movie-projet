import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
class Movie {
    @PrimaryKey() id: string;

    @ApiProperty({
        description: "Nom du film",
        example: "Indiana Jones"
    })
    @Property()
    title: string;

    @ApiProperty({
        description: "Année de sortie du film",
        example: 1984
    })
    @Property()
    date: number;
    @ApiProperty({
        description: "Genre du film",
        example: "Aventure"
    })
    @Property()
    genre: string;
}

export { Movie}