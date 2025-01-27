import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
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
}

export {Productor}