import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Song} from "./entity/Song"


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Song],
    migrations: [],
    subscribers: [],
})
