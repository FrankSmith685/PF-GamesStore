const { getVideoGamesDB } = require("./getGamesDB")
const getGenres = require("./getGenres");
const getPlatforms = require("./getPlataforms");
const getTags = require("./getTags");
const { getVideogamesApi } = require("./getVideoGamesApi")
//Funcion que trae todos los juegos api y db
const getAllVideoGames = async () => {
    
    let dbGames = await getVideoGamesDB();
    // console.log(dbGames)
    if(dbGames.length==0){
        let gen = await getGenres();
        let plat= await getPlatforms();
        let tag = await  getTags();
        let allGames = await getVideogamesApi();
        return getVideoGamesDB()
    }
    return  dbGames;
       

}

//funcion para filtrar videojuegos por name
const getVideogamesByName=async(name)=>{
    const allGames=await getAllVideoGames();
    let searchByName = allGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    if(searchByName.length>0){
        return searchByName;
    }else{
        throw new Error("Error: No existe name de videojuego");
    }
}

//funcion para filtrar videojuegos por genre
const getVideogamesByGenre=async(genre)=>{
        const allGames=await getAllVideoGames();
        let gen= genre[0].toUpperCase() + genre.slice(1) ;
        let filterGenre= allGames.filter((game) => game.genres.map((el) =>el.name).includes(gen));
      
        if(filterGenre.length>0){
            return filterGenre
        } else{
            throw new Error("Error: No existe genero de videojuego");
        }
}

//funcion para filtrar videojuegos por plataforma
const getVideogamesByPlatforms=async(platform)=>{
        const allGames=await getAllVideoGames();
        let plat= platform[0].toUpperCase() + platform.slice(1);
        let filterPlatform= allGames.filter((e) =>  e.platforms.map((el) =>el.name).includes(plat));
        if(filterPlatform.length>0){
            return filterPlatform;
        } else{
            throw new Error("Error: No existe plataforma de videojuego");
        }
}

//funcion para filtrar videojuegos por tag
const getVideogamesByTag=async(tag)=>{
    const allGames=await getAllVideoGames();
    let ta= tag[0].toUpperCase() + tag.slice(1);
        let filterTags= allGames.filter((e) => e.tags.map(el=>el.name).includes(ta));
        if(filterTags.length>0){
            return filterTags;
        } else{
            throw new Error("Error: No existe Tag de videojuego");
        }
}


//Función para traer juegos y buscar por nombre
// const getGamesByName = async (req, res) => {
//     let {name, genre, platform, tag } = req.query
       
//     let dbGames = await getVideoGamesDB()
//     let apiGames = await getVideogamesApi()
//     let allGames = [...dbGames, ...apiGames]
//     if(name) {
//         let searchByName = allGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
//         if(!searchByName.length) {
//             return res.send(allGames)
//         } else {
//             return res.json(searchByName)
//         }
//     } 
//     if(genre){
//         let gen= genre[0].toUpperCase() + genre.slice(1);
//         let filterGenre= allGames.filter((e) => e.genres.includes(gen));
//         if(!filterGenre.length){
//             return res.send(allGames)
//         } else{
//             return res.send(filterGenre);
//         }
//     }
//     if(platform){
//         let plat= platform[0].toUpperCase() + platform.slice(1);
//         let filterPlatform= allGames.filter((e) => e.platforms.includes(plat));
//         if(!filterPlatform.length){
//             return res.send(allGames)
//         } else{
//             return res.send(filterPlatform);
//         }
//     }
//     if(tag){
//         let ta= tag[0].toUpperCase() + tag.slice(1);
//         let filterTags= allGames.filter((e) => e.tags.includes(ta));
//         if(!filterTags.length){
//             return res.send(allGames)
//         } else{
//             return res.send(filterTags);
//         }
//     }

//     return res.send(allGames)

// }


  module.exports = {
    getAllVideoGames,
    getVideogamesByName,
    getVideogamesByGenre,
    getVideogamesByPlatforms,
    getVideogamesByTag
}