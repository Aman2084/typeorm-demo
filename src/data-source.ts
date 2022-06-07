import "reflect-metadata"
import { DataSource } from "typeorm"
import {Song} from "./entity/Song"
import { Album } from "./entity/Album"
import { Relation } from "./entity/Relation"


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Album, Song, Relation],
    migrations: [],
    subscribers: [],
})
