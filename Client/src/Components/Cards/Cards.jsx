import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, deleteItemFromFavs } from "../../redux/Actions/Index.js";
import PrettyRating from "pretty-rating-react";
import { useEffect } from "react";
import './Cards.css';
import CardHover from "../NewCard/CardHover.jsx";
import {
    faStar,
    faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";
import swal from 'sweetalert';

export default function Card({ card }) {

    let { name, image, price, rating, id } = card
    const dispatch = useDispatch()
    const [render, setRender] = useState('')
    const favoritos = useSelector(state => state.favorites)

    function handleFavourite(e) {
        let item = {
            id: id,
            name: name,
            price: price,
            image: image,
        }
        if (e.target.checked) {
            dispatch(addToFav(item))
            swal({
                title: `${name} added to your favorites!`,
                // background: 'black' 
            })
            setRender(render, 'hola')
        } else {
            dispatch(deleteItemFromFavs(item.id))
            swal({
                title: `${name} remove from your favorites!`,
            })
            setRender(render, 'hola')
        }
    }

    let favorites = JSON.parse(localStorage.getItem("favProducts"));

    const icons = {
        star: {
            complete: faStar,
            half: faStarHalfAlt,
            empty: farStar,
        }
    }
    const colors = {
        star: ['#d9ad26', '#d9ad26', '#434b4d'],
    }

    useEffect(() => {
        localStorage.setItem("favProducts", JSON.stringify(favoritos));
    }, [favoritos]);

    console.log("CARD",card)
    console.log("FAVORITES",favorites)

    return (
        <div>
            <div className="fav-game-list">
                <Link to={`/home/games/${id}`} className='Link'>
                    <CardHover image={image} name={name}>
                    </CardHover>
                </Link>
                {
                    favorites?.includes(card.id) ?
                        <div className="card-favourite">
                            <span> {name} </span>
                            <input id={`hearth-${id}`} type="checkbox" value={name} onClick={(e) => handleFavourite(e)} checked={true} className="favourite-checkbox" />
                            <label className="favourite-label" htmlFor={`hearth-${id}`}>❤</label>
                        </div>
                        :
                        <div className="card-favourite">
                            <span> {name} </span>
                            <input id={`hearth-${id}`} type="checkbox" value={name} onClick={(e) => handleFavourite(e)} className="favourite-checkbox" />
                            <label className="favourite-label" htmlFor={`hearth-${id}`}>❤</label>
                        </div>
                }
            </div>
            <div className="card-data">
                <span className="h">{price} US$</span>
                <PrettyRating value={rating} icons={icons.star} colors={colors.star} />
            </div>


        </div>
    )
}