import { EntityManager } from "typeorm";
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
    async getAlbumById($id:number){
        const ra = this.manager.getRepository(Album)
        const a = ra.findOne({where:{id: $id}})
        if(!a){
            return null
        }
        let songs:Song[] = []
        const rr = this.manager.getRepository(Relation)
        const ar = await rr.find({where: {albumId:$id}})
        if(ar && ar.length){
            const sIds = ar.map(r=>r.songId)
            songs = await this.manager.findByIds(Song ,sIds)
        }
        return {
            id: (await a).id,
            name: (await a).name,
            songs: songs
        }
    }

// Song的增删改
    async addSong($name:string , $albumId?:number){
        let s = new Song()
        s.name = $name
        s = await this.manager.save(s)
        if($albumId){
            let r = new Relation()
            r.songId = s.id
            r.albumId = $albumId
            await this.manager.save(r)
        }
        return s
    }

    async updateSong($id:number, $name:string){
        const r = this.manager.getRepository(Song)
        const s = await r.findOne({where:{id: $id}})
        if(s && s instanceof Song){
            s.name = $name
            await this.manager.save(s)
            return true
        }
        return false
    }

    async removeSong($id:number){
        const rs = this.manager.getRepository(Song)
        const s = await rs.findOne({where:{id: $id}})
        if(!s){
            return false
        }
        if(s instanceof Song){
            await this.manager.remove(s)
        }
        const rr = this.manager.getRepository(Relation)
        const a = await rr.find({where:{songId: $id}})
        await this.manager.remove(a)
        return true
    }
}

export default SQL;