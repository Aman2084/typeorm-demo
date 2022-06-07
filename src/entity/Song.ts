import {Entity , PrimaryGeneratedColumn , Column, OneToMany, JoinColumn, ManyToOne} from "typeorm"
import { Album } from "./Album"

@Entity()
export class Song{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string



    /*  
    @ManyToOne((type) => Album , (album) => album.songs)
    album: Album
   */
}