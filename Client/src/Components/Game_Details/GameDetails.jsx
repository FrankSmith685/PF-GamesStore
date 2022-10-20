import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGameById, addToCart, addToFav, getReviews, vaciarGame, postReview } from "../../redux/Actions/Index.js";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ReactPlayer from 'react-player'
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";
import CardHover from "../NewCard/CardHover.jsx";
//import Modal from 'react-modal'
import { Modal } from 'reactstrap'
import PrettyRating from "pretty-rating-react";
import {
    faStar,
    faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

import '../Game_Details/GameDetails.css'
import swal from 'sweetalert'

export default function GameDetails() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const game = useSelector(state => state.game)
    const reviews = useSelector(state => state.reviews)
    const items = useSelector(state => state.cart)
    const favoritos = useSelector(state => state.favorites)

    const { id } = useParams() // usa el parametro de la URL
    const [imgPop, setImgPop] = useState(false)

    const [img, setImg] = useState("")
    
    useEffect(() => {
        dispatch(getGameById(id))
        dispatch(getReviews(id))
        return function limpiar() {
            dispatch(vaciarGame())
        }
    }, [dispatch, id])

    function onHanddlePop(img) {
        setImg(img)
        imgPop === false ? setImgPop(true) : setImgPop(false)
    }

    function addGameToCart() {
        let item = {
            id: game.id,
            name: game.name,
            price: game.price,
            image: game.image,
        }
        dispatch(addToCart(item))
        swal({
            title: `${game.name} added to cart!`})
    }

    function addGameToFav() {
        let item = {
            id: game.id,
            name: game.name,
            price: game.price,
            image: game.image,
        }
        dispatch(addToFav(item))
        swal({
            title: `${game.name} added to your favorites!`
        })
    }

    async function buy() {
        await addGameToCart();
        await localStorage.setItem("precioTotal", JSON.stringify(game.price));
        navigate("/cart/formularioPago");
    }

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(items));
        localStorage.setItem("favProducts", JSON.stringify(favoritos));
    }, [items, favoritos]);

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

    let userLogged = JSON.parse(localStorage.getItem("user"));

    console.log("GAME", game)
    console.log("REVIEWS", reviews)
    console.log("USER", userLogged.user)

    const [input, setInput] = useState(
        userLogged.user ?
            { userIdName: userLogged.user.id_name }
            :
            null
    )
    const score = [1, 2, 3, 4, 5]

    function handleInput(event) {
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(postReview(id, input))
        setInput({})
        window.location.reload()
        swal({title:"Commentary sent!"})
        //navigate(`/home`);
        // window.scrollTo({ behavior: "smooth", top: "0px" });
        // render === "" ? setRender("render") : setRender("")
    }

    function handleRadio(event) {

        let currentRadio = document.getElementById(event.target.id);

        if (event.target.id === input.value) {
            currentRadio.checked = false
            setInput({
                ...input,
                "value": null
            })
        }
        else {
            setInput({
                ...input,
                "value": event.target.value
            })
        }
    }

    return (
        <div className="game_detail">
            {
                typeof game === "object" ?

                    <div id="conteiner_detalles">
                        <div id="conteinerData_detalles2">
                            <div id="conteinerData_detalles">
                                {
                                    imgPop === true ?
                                        <Modal isOpen={imgPop} fade={true} id="modal_detail" closeTimeoutMs={500}>
                                            <img src={img} alt="ImagenPOP" id="imagen_pop" ></img>
                                            <button onClick={() => setImgPop(false)}>X</button>
                                        </Modal>
                                        :
                                        null
                                }
                                {
                                    typeof game.video === "object" ?
                                        game.video.length > 0 ?
                                            <Carousel
                                                showArrows={true}
                                                infiniteLoop={true}
                                                centerMode={true}
                                                renderIndicator={false}
                                            >
                                                {
                                                    game.video.map((video) => {
                                                        return (
                                                            < ReactPlayer
                                                                id="game_video"
                                                                url={video}
                                                                controls
                                                            />

                                                        )
                                                    })
                                                }
                                            </Carousel>
                                            :
                                            <img className="imagenJuego" src={game.image} alt="imagenJuego"></img>
                                        :
                                        <img className="imagenJuego" src={game.image} alt="imagenJuego"></img>
                                }
                                <div>
                                    <h1>{game.name}</h1>
                                    <hr />
                                    <h3>Rating : </h3>
                                    <PrettyRating value={game.rating} icons={icons.star} colors={colors.star} />
                                    <p>{game.rating}</p>
                                    <hr />
                                    <div className='imagenesJuego' >

                                        {
                                            game.screenshots && game.screenshots.map((img, index) => {
                                                return (
                                                    <div key={img} id="boton_juego">
                                                        {
                                                            index !== 0 ?
                                                                <button onClick={() => onHanddlePop(img)}><img className="imagenJuego" src={img} alt="imagenJuego"></img></button>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                <hr />
                                <p dangerouslySetInnerHTML={{ __html: game.description }} />
                                <hr />
                                <h3>Related games</h3>
                                <div id="contenedor_miniCards">
                                    {
                                        game.series && game.series.map(card => {
                                            return (
                                                <a href={`https://rawg.io/search?query=${card.name}`}  target="_blank" rel="noreferrer">
                                                <CardHover
                                                    image={card.image} name={card.name} />
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <h3>Tags</h3>
                                <div id="contenedor_tags">
                                    {
                                        game.tags && game.tags.map(tag => {
                                            return (
                                                // <div id="tag_details" key={tag.name}>
                                                <li>{tag.name}</li>
                                                // </div>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                {
                                    reviews.length > 0 ?
                                        <div>
                                            <h3>Reviews</h3>
                                            {
                                                reviews.map(rev => {
                                                    return (
                                                        <div id="contenedor_rev">
                                                            <p>{rev.createdAt}</p>
                                                            <p>{rev.review}</p>
                                                            <PrettyRating value={rev.value} icons={icons.star} colors={colors.star} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                        null
                                }
                                {
                                    userLogged.user && userLogged.user.banned === false ?
                                        <form onSubmit={(event) => handleSubmit(event)} className="Form_review">
                                            <div id="Label_review">
                                                <label>Comment this game!</label>
                                                <textarea id="Review"
                                                    type='text'
                                                    value={input.review}
                                                    name='review'
                                                    placeholder="Here you can put your review"
                                                    rows="5" cols="55"
                                                    onChange={(event) => handleInput(event)}
                                                />
                                            </div>
                                            <div className="Label_score_detail">
                                                <label>Score</label>
                                                <div id="score">
                                                    {
                                                        score.map(number => {
                                                            return (
                                                                <div key={number}>
                                                                    <input type="radio" value={number} onClick={(event) => handleRadio(event)} id={`${number}`} name="value" />
                                                                    <label htmlFor={`${number}`}> {number} </label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <button id="submit" type="submit">Post review</button>
                                        </form>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        <div id="conteinerSide_detalles2">
                            <aside id="conteinerSide_detalles">
                                <h1>{game.name}</h1>
                                <a href={game.website} target="_blank" rel="noreferrer"><h3>Official Website</h3></a>
                                <img className="imagenJuego" src={game.image} alt="imagenJuego"></img>
                                <p>{game.realeaseDate}</p>
                                <div>
                                    <h2>Platforms</h2>
                                    {
                                        game.platforms && game.platforms.map(plat => {
                                            return (
                                                <p key={plat.name}>{plat.name}</p>
                                            )
                                        })

                                    }
                                </div>
                                <div>
                                    <h2>Developers</h2>
                                    {
                                        game.developers && game.developers.map(dev => {
                                            return (
                                                <p key={dev}>{dev}</p>
                                            )
                                        })

                                    }
                                </div>
                                <div>
                                    <h2>Genres</h2>
                                    {
                                        game.genres && game.genres.map(gen => {
                                            return (
                                                <p key={gen.name}>{gen.name}</p>
                                            )
                                        })

                                    }
                                </div>
                                <div>
                                    <h2>ESRB</h2>
                                    <p key={game.esrb_rating}>{game.esrb_rating}</p>
                                </div>
                                <div>
                                    <h2>Metacritic</h2>
                                    <p>{game.metacritic}</p>
                                </div>
                                <div>
                                    <h2>Publisher</h2>
                                    <p>{game.publishers}</p>
                                </div>
                                <div>
                                    <h2>Stores</h2>
                                    {
                                        game.store && game.store.map(sto => {
                                            return (
                                                <p key={sto}>{sto}</p>
                                            )
                                        })

                                    }
                                </div>

                                <h2>Price : ${game.price}</h2>
                                <button id="buttons_detail_buy" onClick={() => buy()}>Buy now ! 💰</button>
                                <button id="buttons_detail_buy" onClick={() => addGameToCart()}>Add to cart 🛒</button>
                                <button id="buttons_detail_buy" onClick={() => addGameToFav()}>Add to favorites 🤍</button>
                            </aside>
                        </div>
                    </div>
                    :
                    <LoadingScreen />
            }
        </div>
    )
}