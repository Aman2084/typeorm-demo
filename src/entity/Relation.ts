import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, Column} from "typeorm"


/* */

@Entity()
export class Relation{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    songId: number

    @Column()
    albumId: number
}