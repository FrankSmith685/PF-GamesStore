import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrders } from '../../redux/Actions/Index'
import CardHover from "../NewCard/CardHover.jsx";
import PrettyRating from "pretty-rating-react";
import { Link } from "react-router-dom";
import {
    faStar,
    faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

export default function DatosJuegos({ data }) {

    let { id_name } = data

    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const orders = useSelector(state => state.orders)

    console.log("ORDENES PA", orders)

    useEffect(() => {
        dispatch(getOrders(id_name))
    }, [dispatch, id_name])

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

    return (
        <div>
            <h1>My games</h1>
            {
                orders.length > 0 ?
                orders && orders.map(order => {
                    return (
                        <div>
                            {
                                order.games && order.games.map(game => {
                                    return (
                                        <div key={game.id} className='profile-game-list'>
                                            <Link to={`/home/games/${game.id}`} className='Link'>
                                                <CardHover image={game.image} name={game.name}>
                                                </CardHover>
                                            </Link>
                                            <div>
                                                <h3>Price</h3>
                                                <p>${game.price}</p>
                                                <h3>Date of purchase</h3>
                                                <p>{game.createdAt}</p>
                                                <hr></hr>
                                                <h3>Developers</h3>
                                                <p>{game.developers}</p>
                                                <h3>Rating : </h3>
                                                <PrettyRating value={game.rating} icons={icons.star} colors={colors.star} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
                :
                <h3>You have no games yet, explore our store to buy one !</h3>
            }
        </div>
    )
}