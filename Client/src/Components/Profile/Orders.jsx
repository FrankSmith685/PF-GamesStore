import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrders } from '../../redux/Actions/Index'
import './Profile.css'

export default function Orders({ data }) {

    console.log("DATA DE JUEGOS", data)

    let { id_name } = data

    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const orders = useSelector(state => state.orders)

    console.log("ORDENES PA", orders)

    useEffect(() => {
        dispatch(getOrders(id_name))
    }, [dispatch, id_name])

    return (
        <div>
            <h1>Orders</h1>
            {
                orders.length > 0 ?
                orders && orders.map(order => {
                    return (
                        <div id="conteiner_order">
                            <h3>Date</h3>
                            <p>{order.date}</p>

                            <h3>Payment</h3>
                            <p>{order.payment}</p>

                            <h3>Games</h3>
                            {
                                order.games && order.games.map(game => {
                                    return (
                                        <div id="conteinerCart_order">
                                            <h4>Name</h4>
                                            <p>{game.name}</p>
                                            <h4>Price</h4>
                                            <p>${game.price}</p>
                                            <img src={game.image} alt={game.id}></img>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
                :
                <h3>You haven't buy any games yet, explore our store to buy one !</h3>
            }
        </div>
    )
}