import * as Koa from "koa";
import { AppDataSource } from "./data-source"
import { Song } from "./entity/Song";
import { createConnection } from "typeorm";
import { Album } from "./entity/Album";
import { Relation } from "./entity/Relation";
import SQL from "./sql";


const app = new Koa()
const sql = new SQL()
console.log(1);

AppDataSource.initialize().then(async () => {
    sql.manager = AppDataSource.manager
    console.log("数据库初始化完成")
    creatInterface()
    initCompleted()
}).catch(error => {
    console.log("数据库初始化失败" ,error)
})


function creatInterface(){
    app.use(async (ctx , next) => {
        const request = await getRequest(ctx.request.url)
        ctx.body = {
            msg: 'ok',
            code: request? 200 : 401,
            success: true,
            data: request ,
        }
        await next()
    });
    app.listen(3000)
    console.log("接口始化完成")
}

function initCompleted(){
    console.log("========= 初始化完成 =========")

    console.log(
        "1. 查询所有歌曲：http://localhost:3000/getSongs \n",
        "2. 查询所有专辑：http://localhost:3000/getAlbums \n",
        "3. 查询所有关系：http://localhost:3000/getRelations \n",
    );
}

async function getRequest($url:string){
    const a = $url.split("?")
    let o = new Map()
    if(a[1]){
        const b = a[1].split("&")
        b.forEach(s=>{
            const c = s.split("=")
            o.set(c[0] , c[1])
        })
    }
    
    switch(a[0]){
        case "/getSongs":
            return await sql.getAllSongs()
        case "/getAlbums":
            return await sql.getAllSongs()
        case "/getRelations":
            return await sql.getAllRelations()
    }
    return null
}