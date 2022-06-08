import * as Koa from "koa";
import { AppDataSource } from "./data-source";
import SQL from "./sql";


const app = new Koa()
const sql = new SQL()

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
        "4. 添加歌曲：http://localhost:3000/addSong?name=自定义歌曲&album=1  \n",
        "5. 修改歌曲：http://localhost:3000/updateSong?id=9&name=自定义歌曲名A  \n",
        "6. 删除歌曲：http://localhost:3000/removeSong?id=12  \n",
        "6. 查询专辑详情：http://localhost:3000/getAlbumInfo?id=1  \n"


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
        case "/addSong":
            if(o.has("albumId")){
                return await sql.addSong(decodeURI(o.get("name")), Number(o.get("albumId")))
            }else{
                return await sql.addSong(decodeURI(o.get("name")))
            }
        case "/updateSong":
            return await sql.updateSong(Number(o.get("id")), decodeURI(o.get("name")))
        case "/removeSong":
            return await sql.removeSong(Number(o.get("id")))
        case "/getAlbumInfo":
            return await sql.getAlbumById(Number(o.get("id")))
    }
    return null
}