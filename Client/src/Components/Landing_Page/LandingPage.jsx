
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import CardHover2 from './Cardhover2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllGames } from '../../redux/Actions/Index'

import '../Landing_Page/LandingPage.css'
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx"
import { Link } from "react-router-dom";

export default function LandingPage() {


    const dispatch = useDispatch()
    let Allvideogames = useSelector(state => state.Allvideogames)
    let populars = Allvideogames?.filter(games => games.rating > 4.4)

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    return (
        <div className="body_landing">

            {/* {
                populars.length > 0 ?
                <Carrousel2 games={populars}/>
                :
                <LoadingScreen/>
            } */}
            {
                populars.length > 0 ?
                    <Carousel
                        showArrows={true}
                        autoPlay={true}
                        interval={3000}
                        infiniteLoop={true}
                        stopOnHover={true}
                        showThumbs={false}
                        centerSlidePercentage={40}
                        centerMode={true}
                        showStatus={false}
                        swipeable={true}
                        emulateTouch={true}
                        useKeyboardArrows={true}
                        transitionTime={3000}
                        renderIndicator={false}
                    >
                        {
                            populars && populars.map((game) => {
                                return (
                                    // <div key={game.id} id="contenedor_landing_img">
                                    //     <img src={game.image} alt={game.id}/>
                                    //     <Link to={'/home/games/' + game.id} key={game.id}><p className="legend">{game.name}</p></Link>
                                    // </div>
                                        <Link to={`/home/games/${game.id}`}>
                                            <CardHover2
                                                name={game.name}
                                                image={game.image}
                                            />
                                        </Link>
                                )
                            })
                        }
                    </Carousel>
                    :
                    <LoadingScreen />
            }
        </div>
    )
}