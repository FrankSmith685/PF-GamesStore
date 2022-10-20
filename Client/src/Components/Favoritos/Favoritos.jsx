import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteItemFromFavs } from "../../redux/Actions/Index.js";
import { Link } from "react-router-dom";
import Icon from '../../Style/Imagenes/Icon.PNG'
import CardHover from "../NewCard/CardHover.jsx";
import PrettyRating from "pretty-rating-react";
import swal from 'sweetalert';
import {
    faStar,
    faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";


import '../Favoritos/Favoritos.css'

export default function Favs() {

    const dispatch = useDispatch()
    const items = useSelector(state => state.favorites)

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


    function deleteItem(id) {
        dispatch(deleteItemFromFavs(id))
    }

    function agregarAlCarrito(item) {
        dispatch(deleteItemFromFavs(item.id))
        dispatch(addToCart(item))
        swal({title:`${item.name} to cart !`})
    }

    useEffect(() => {
        localStorage.setItem("favProducts", JSON.stringify(items));
    }, [items]);

    return (
        <div className="conteinerCart">
            <h1>Welcome to your favorites list !</h1>
            {
                items && items.length ?
                    <div id="conteinerCart2">{
                        items && items?.map(item => {
                            return (
                                <div key={item.id} id='cart-item-list'>
                                    <Link to={`/home/games/${item.id}`} className='Link'>
                                        <CardHover image={item.image} name={item.name}>
                                        </CardHover>
                                    </Link>
                                    <div>
                                        <h3>Price</h3>
                                        <p>${item.price}</p>
                                        <h3>Rating : </h3>
                                        <PrettyRating value={item.rating} icons={icons.star} colors={colors.star} />
                                    </div>
                                    <div id="cart_fav_buttons">
                                        <button onClick={() => { if (window.confirm(`Are you sure delete ${item.name} from your favorites ?`))deleteItem(item.id)}}>🗑</button>
                                        <button onClick={() => agregarAlCarrito(item)}>🛒</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                        <div id="caja">
                            <button onClick={() => { if (window.confirm("Are you sure to empty your favorites ?"))deleteItem("All")}}>Empty favorites list</button>
                        </div>
                    </div>
                    :
                    <div id="no_games_cart">
                        <img src={Icon} alt="Sad Face"></img>
                        <h1>The are no games in your favorites list</h1>
                    </div>
            }
        </div>
    )
}