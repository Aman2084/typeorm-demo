import { Entity, PrimaryGeneratedColumn , Column, OneToMany} from "typeorm"
import { Song } from "./Song";
import { type } from "os";

@Entity()
export class Album{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    /*  没弄明白...
    @OneToMany(type=>Song , song=>song.album)
    songs: Song[]
    */

}