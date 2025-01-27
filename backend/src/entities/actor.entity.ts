import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
class Actor {

    @PrimaryKey()
    id: number;

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
    @Property()
    birthdate: Date;
    @ApiProperty({
        description: "Pays",
        example:"USA"
    })
    @Property()
    country: string;
}

export {Actor}