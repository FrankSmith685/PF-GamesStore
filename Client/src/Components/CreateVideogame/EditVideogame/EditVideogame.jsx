import React from "react"
import "./EditVideogame.css"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGameById,getGenres,getPlatforms,getAllGames } from "../../../redux/Actions/Index";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import swal from "sweetalert";

export default function EditVideogame(){
    const {id}= useParams();
    const dispatch= useDispatch();
    let platforms = useSelector(state => state.platforms)
    let gametoEdit= useSelector(state=>state.game)
    let genres = useSelector(state => state.genres)
    const [state,setState]=useState(gametoEdit)

    const[errors,setErrors]=useState({
       name:true,
       price: true,
       description: true,
       rating: true ,
       image: false,
       videoTrailer: false ,
       platforms: true,
       genres: true,
       
   })

   const[validate,setValidate]=useState({
    name:false,
    price: false,
    description: false,
    rating: false ,
      
})
const[value,setValue]=useState({
   name:"" 
})

    useEffect(()=>{
        dispatch(getGenres());
        dispatch(getPlatforms());
       id&& dispatch(getGameById(id));
    },[dispatch,id])



    function onChangeName(e){
        setState({...state,[e.target.name]:e.target.value})
            setErrors({...errors,[e.target.name]:!(e.target.value.length>4&&e.target.value.length<15)})
        
       }
       function onBlurName(e){
   
       }
       function onKeyUp(e){
   
       }
       function onChangePrice(e){
           setState({...state,[e.target.name]:e.target.value})
           setErrors({...errors,[e.target.name]:(e.target.value===undefined||e.target.value<0)})
       
       }
       function onBlurPrice(e){
   
       }
       function onKeyUpPrice(e){
   
       }
       function onChangeDescription(e){
           setState({...state,[e.target.name]:e.target.value})
           setErrors({...errors,[e.target.name]:!(e.target.value.length>10&&e.target.value.length<200)})
       }
       function onBlurDescription(e){
   
       }
       function onKeyUpDescription(e){
   
       }
       function onChangeRating(e){
           setState({...state,[e.target.name]:e.target.value})
           setErrors({...errors,[e.target.name]:(e.target.value<1||e.target.value>5)})
       }
       function onBlurRating(e){
   
       }
       function onKeyUpRating(e){
   
       }
       function onChangeGenre(e){
           if(state.genres.includes(e.target.value)){
                swal({title:"genero previamente seleccionado"})
               return
           }
           setState({...state,[e.target.name]:[...state.genres,e.target.value]})
           setErrors({...errors,genres:false})
       }
       function onChangePlatform(e){
           if(state.platforms.includes(e.target.value)){
               swal;(title:{"plataforma previamente seleccionada"})
               return
           }
           setState({...state,[e.target.name]:[...state.platforms,e.target.value]})
           setErrors({...errors,platforms:false})
           
       }
       function stars(number) {
        if (number >= 1 && number < 2) {
            return "⭐"
        }
        else if (number >= 2 && number < 3) {
            return "⭐⭐"
        }
        else if (number >= 3 && number < 4) {
            return "⭐⭐⭐"
        }
        else if (number >= 4 && number < 5) {
            return "⭐⭐⭐⭐"
        }
        else if (number === 5) {
            return "⭐⭐⭐⭐⭐"
        }
    }
       function onChangeImg(e){
   
       }
       function onBlurImg(e){
   
       }
       function onKeyUpImg(e){
   
       }
       function onChangeVideo(e){
   
       }
       function onBlurVideo(e){
   
       }
       function onKeyUpVideo(e){
   
       }
       function deleteGenre(e){
         if(!(state.genres.length-1)){
             setErrors({
                 ...errors,genres:true
             })
         }
         setState({...state,genres:state.genres.filter(genre=>genre!=e.target.value)})
       }
       function deletePlatform(e){
           if(!(state.platforms.length-1)){
               setErrors({
                   ...errors,platforms:true
               })
           }
           setState({...state,platforms:state.platforms.filter(platform=>platform!=e.target.value)})
         
       }
       function validar(e){
           e.preventDefault()
           for(var props in errors){
               if(errors[props]){
                   swal ({title:"debe corregir errores"})
                   return
               }
           }
           swal({title:"OK"})
       }
       if(!state||!genres||!platforms){
        
           return <span>Cargando</span>
       }
       //function onClickGuardar(e){
        //     e.preventDefault()
         //    dispatch(guardarVideogames)
       //}
       function onChangeFilterVideoGame(e){
           e.preventDefault()
           setValue({...value,name:e.target.value})
           dispatch(getAllGames(value.name))
           
       }
    return(
       <div className="divedit">
       {/* { <input type="text" className="search_edit" onChange={(e)=>onChangeFilterVideoGame(e)}name="name" value={value.name}/>} */}
       <form onSubmit={e=>validar(e)} id="edit">
        {/* componente name */}
        <div>
         <label>Name</label>
         <input type="text" onChange={(e)=>onChangeName(e)}name="name" value={state.name} onBlur={(e)=>onBlurName(e)} onKeyUp={(e)=>onKeyUp} placeholder={gametoEdit.name}></input>
         {
                     (errors.name && !validate.name )&& (
                        <p>nombre incorrecto</p>
                     )
                 }
                {
                     validate.name && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        </div>
        <div>
         <label>Price</label>
         <input type="number" onChange={(e)=>onChangePrice(e)}name="price" value= {state.price} onBlur={(e)=>onBlurPrice(e)} onKeyUp={(e)=>onKeyUpPrice(e)} placeholder={gametoEdit.price}></input>
         {
                     (errors.price && !validate.price )&& (
                        <p>precio incorrecto</p>
                     )
                 }
                {
                     validate.price && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        </div>
        <div>
         <label>Description</label>
         <textarea type="text" onChange={(e)=>onChangeDescription(e)}name="description" value= {state.description} onBlur={(e)=>onBlurDescription(e)} onKeyUp={(e)=>onKeyUpDescription(e)} placeholder={gametoEdit.description}></textarea>
         {
                     (errors.description && !validate.description )&& (
                        <p>Descripcion incorrecta</p>
                     )
                 }
                {
                     validate.description && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        </div>
        <div>
         <label>Rating</label>
         <input type="text" onChange={(e)=>onChangeRating(e)}name="rating" value= {state.rating} onBlur={(e)=>onBlurRating(e)} onKeyUp={(e)=>onKeyUpRating(e)} placeholder={gametoEdit.rating}></input>
         {
                     (errors.rating && !validate.rating )&& (
                        <p>Rating incorrecto</p>
                     )
                 }
                {
                     validate.rating && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        </div>
        <div>
         <label>Imagen</label>
         <input type="image"onChange={(e)=>onChangeImg(e)}name="image" value= {state.image} onBlur={(e)=>onBlurImg(e)} onKeyUp={(e)=>onKeyUpImg(e)} placeholder="ingresar imagen"></input>
         {
                     (errors.image && !validate.image )&& (
                        <p>{errors.image}</p>
                     )
                 }
                {
                     validate.image && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        </div>
        <div>
        <label>VideoTrailer</label>
        <input type="video" onChange={(e)=>onChangeVideo(e)}name="videoTrailer" value= {state.videoTrailer} onBlur={(e)=>onBlurVideo(e)} onKeyUp={(e)=>onKeyUpVideo(e)} placeholder="ingresar video"></input>
         {
                     (errors.videoTrailer && !validate.videoTrailer )&& (
                        <p>{errors.videoTrailer}</p>
                     )
                 }
                {
                     validate.videoTrailer && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        </div>
        <div>
        <label>Genres</label>
        <select name="genres" onChange={(e)=>onChangeGenre(e)}>
        <option selected disabled>Seleccionar Genero</option>
        {genres?.map(genre=>{
            return(
                <option value={genre.name} key={genre.id}>{genre.name} </option>
            )
        })}
        </select>
        </div>
        <div>
         {state.genres?.map(e=>{
             return(
                 <button onClick={(e)=>deleteGenre(e)} value={e}>{e}</button>
             )
         })}
        </div>
        {
                     (errors.genres && !validate.genres )&& (
                        <p>Debe seleccionar generos</p>
                     )
                 }
                {
                     validate.videoTrailer && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        <div>
        <label>Platforms</label>
        <select onChange={(e)=>onChangePlatform(e)}>
        <option>Seleccionar Plataforma</option>
        {platforms?.map(e=>{
            return(
                <option value={e.name} key={e.id}>{e.name} </option>
            )
        })}
        </select>
        <div>
         {state.platforms?.map(e=>{
             return(
                 <button onClick={(e)=>deletePlatform(e)} value={e}>{e}</button>
             )
         })}
        </div>
        {
                     (errors.platforms && !validate.platforms )&& (
                        <p>Debe seleccionar plataformas</p>
                     )
                 }
                {
                     validate.platforms && (
                         <p>Debe contener caracteres correctamente</p>
                     )
                }
        </div>
       <button type="submit">Submit</button>

        </form>
        {/* visualizar */}

        <div className="game_detail_edit">
            {
                state ?

                    <div id="conteiner_detalles_edit">
                        <div id="conteinerData_detalles2_edit">
                            <div id="conteinerData_detalles_edit">
                                {/* {
                                    false === true ?
                                        <ImagenPop show={onHanddlePop} imgPop={imgPop} img={img} />
                                        :
                                        null
                                } */}
                                {/* < ReactPlayer
                                    id="game_video"
                                    url={getVideo()}
                                    controls
                                    playing
                                    loop
                                /> */}
                                <div>
                                    <h1>{state.name}</h1>
                                    <h3>{stars(state.rating)} {state.rating}</h3>

                                    {/* <div className='imagenesJuego' >

                                        {
                                            game[0].screenshots && game[0].screenshots.map(img => {
                                                return (
                                                    <div key={img} id="boton_juego">
                                                        <button onClick={() => onHanddlePop(img)}><img className="imagenJuego" src={img} alt="imagenJuego"></img></button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> */}

                                </div>
                                <hr />
                                <p dangerouslySetInnerHTML={{ __html: state.description }} />
                            </div>
                        </div>
                        <div id="conteinerSide_detalles2_edit">
                            <aside id="conteinerSide_detalles_edit">
                                <h1>{state.name}</h1>
                                {/* <a href={game[0].website} target="_blank" rel="noreferrer"><h3>{game[0].website}</h3></a> */}
                                <img src={state.image} alt="gameImage" width="100%"></img>
                                {/* <h3>Release date :</h3> */}
                                {/* <p>{game[0].realeaseDate}</p> */}
                                <div>
                                    <h3>Plataformas</h3>
                                    {
                                        state.platforms && state.platforms.map(plat => {
                                            return (
                                                <p key={plat}>{plat}</p>
                                            )
                                        })

                                    }
                                </div>
                                {/* <div>
                                    <h3>Developers</h3>
                                    {
                                        game[0].developers && game[0].developers.map(dev => {
                                            return (
                                                <p key={dev}>{dev}</p>
                                            )
                                        })

                                    }
                                </div> */}
                                {/* <div>
                                    <h3>ESRB</h3>
                                    <p key={game[0].esrb_rating.id}>{game[0].esrb_rating.name}</p>
                                </div> */}
                                {/* <div>
                                    <h3>Metacritic</h3>
                                    <p>{game[0].metacritic}</p>
                                </div>
                                <div>
                                    <h3>Publisher</h3>
                                    <p>{game[0].publishers[0].name}</p>
                                </div>*/}
                                {/* <div> 
                                    <h3>Stores</h3>
                                    {
                                        game[0].stores && game[0].stores.map(sto => {
                                            return (
                                                <p key={sto}>{sto}</p>
                                            )
                                        })

                                    }
                                </div> */}
                                
        
                            </aside>
                        </div>
                    </div>
                    :
                     <LoadingScreen/>

            }
        </div>
        {/* <button onClick={e=>}></button> */}
        </div>
        
    )

    
}