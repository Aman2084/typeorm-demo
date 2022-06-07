import { resolve } from "dns";
import { EntityManager } from "typeorm";
import { AppDataSource } from "./data-source";
import { Song } from "./entity/Song";
import { Album } from "./entity/Album";
import { Relation } from "./entity/Relation";

class SQL{

    manager:EntityManager

    
// 查询类
    async getAllSongs(){
        const a = await this.manager.find(Song)
        return a
    }
    async getAllAlbums(){
        const a = await this.manager.find(Album)
        return a
    }
    async getAllRelations(){
        const a = await this.manager.find(Relation)
        return a
    }


}

export default SQL;