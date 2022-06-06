import { Entity, PrimaryGeneratedColumn , Column} from "typeorm"

@Entity()
export class Relation{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    album: number

    @Column()
    song: number

}