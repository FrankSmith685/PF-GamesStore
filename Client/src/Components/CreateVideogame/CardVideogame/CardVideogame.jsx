import React from "react"
import { Link } from "react-router-dom"

export default function CardVideogame({image,id,name,price,rating}){
    return(
<div>
            {/* <Link to={`/home/games/${id}`} className='Link'> */}
               
                    <div>
                    <img>{image}</img>
                    <span>{name}</span>
                    <span>{price}</span>
                    <span> {rating} </span>
                    <Link to={`/home/editgames/${id}`}>{icon1}</Link>
                    <span>{icon2}</span>
                </div>
            {/* </Link> */}
        </div> 
    )
}