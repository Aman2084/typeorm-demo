import { Entity, PrimaryGeneratedColumn , Column} from "typeorm"

@Entity()
export class Album{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

}