import '../Home/Home.scss'
//import SearchBar from '../SearchBar/SearchBar'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate  } from "react-router-dom";
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import { getAllGames, Getbygenre, Getbytag, vaciarGame } from '../../redux/Actions/Index'
import CardDescription from '../NewCard/CardDescription';
import CardHover from '../NewCard/CardHover';
import Suscribe from '../Suscribe/Suscribe';




export default function Home () {

    const dispatch = useDispatch()
   const navigate = useNavigate()
    
    let Allvideogames = useSelector(state => state.Allvideogames)
    let videogamesBytag = useSelector(state => state.videogamesBytag)
    let videogamesBygenre = useSelector(state => state.videogamesBygenre)
    useEffect(() => {    
        Allvideogames.length === 0 ? dispatch(getAllGames()) : console.log('Allvideogames en store')
        videogamesBygenre.length === 0 ? dispatch(Getbygenre('Indie')) : console.log('Indie games en store')
        videogamesBytag.length === 0 ? dispatch(Getbytag('Online multiplayer')) : console.log('Online games en store')
        // dispatch(vaciarGame()) // para vaciar estado global del juegodetail
    }, [])

    // const onSearch = (name) => {
    //     navigate("../home/games", { replace: true });
    //     dispatch(getAllGames(name))
    // }
    let populars = Allvideogames?.filter(games => games.rating > 4.5).slice(0,5)
    const GameofTheWeek = populars[4] 

    const cheaps = Allvideogames.sort((a, b) => {
                        if (a.price > b.price) {
                            return 1
                        }
                        if (a.price < b.price) {
                            return -1
                        }
                        return 0
                    }).slice(0,5)

    const news = Allvideogames.sort((a, b) => {
                    if (a.realeaseDate < b.realeaseDate) {
                        return 1
                    }
                    if (a.realeaseDate > b.realeaseDate) {
                        return -1
                    }
                    return 0
                }).slice(0,20)

    const oldies = Allvideogames.sort((a, b) => {
        if (a.realeaseDate > b.realeaseDate) {
            return 1
        }
        if (a.realeaseDate < b.realeaseDate) {
            return -1
        }
        return 0
    }).slice(0,20)
   
    function handleLink() {
        navigate(`/home/games/${GameofTheWeek.id}`)
    }

    return (
    <div className="Home">
        {
            Allvideogames[0] ?

            <div className='Home-Games'>
                <div className='main-carrousel'>
                    <Carousel
                        showArrows={false} 
                        autoPlay={true} 
                        interval={5000}
                        width={'100%'}     
                        infiniteLoop={true} 
                        stopOnHover={true} 
                        autoFocus={true}
                        emulateTouch={true}
                        swipeable={true}
                        showThumbs={false}
                        renderIndicator={false}
                        >
                            {
                                GameofTheWeek?.screenshots?.map(img => {
                                    return (
                                        <div className='slide-main'>
                                            <img width={900} src={img} alt='img'></img>
                                        </div>
                                    )
                                })
                            }
                    </Carousel>
                    <div className='main-title-home'>   
                        <h1 >{GameofTheWeek.name}</h1>
                        <button class="kave-btn" onClick={handleLink} > <span class='kave-line' >Disponible Ahora</span> </button>
                    </div>
                </div>

                <hr></hr>


                <div className='carruseles'>

                    <h1 className='h'> New Releases : </h1>

                    <Carousel 
                        showArrows={true} 
                        autoPlay={true} 
                        interval={5000} 
                        infiniteLoop={true} 
                        stopOnHover={true} 
                        showThumbs={false}

                        width={1600}
                        dynamicHeight={true}
                        renderIndicator={false}
                        >
                        {
                            <div className='carrusel-triple'>
                                {
                                news.slice(0,4).map((game) => {
                                    return (
                                            <Link to={`/home/games/${game.id}`}>
                                                <CardDescription
                                                card={game}
                                                />
                                            </Link>
                                    )
                                })
                                }
                            </div>
                        }
                        {
                            <div className='carrusel-triple'>
                                {
                            news.slice(4,8).map((game) => {
                                return (
                                    <Link to={`/home/games/${game.id}`}>
                                                <CardDescription
                                                card={game}
                                                />
                                            </Link>
                                )
                            })
                                }
                            </div>
                        }
                        {
                            <div className='carrusel-triple'>
                                {   
                            news.slice(8,12).map((game) => {
                                return (
                                    <Link to={`/home/games/${game.id}`}>
                                                <CardDescription
                                                card={game}
                                                />
                                            </Link>
                                )
                                }) 
                            }
                            </div>
                        }       
                        {
                            <div className='carrusel-triple'>
                                {
                                    news.slice(12,16).map((game) => {
                                     return (
                                        <Link to={`/home/games/${game.id}`}>
                                                <CardDescription
                                                card={game}
                                                />
                                            </Link>
                                     )
                                      })  

                                }
                            </div>
                        }

                    </Carousel>
                </div >
                <hr></hr>

                <div className='home-list'>
                    <div className='individual-list-home'> 
                        <h1> Discounts of the Month  </h1>
                            <ul className='unordered-list-home-first'>
                                {
                                    cheaps?.map(game => {
                                        return (
                                            <div key={game.id} className='home-game-list'>
                                            <Link to={`/home/games/${game.id}`}>
                                                <CardHover
                                                name={game.name}
                                                image={game.image}
                                                />  
                                            </Link>    
                                           <div>
                                                    <h3>{game.name}</h3>
                                                    <hr></hr>
                                                    <h2>{`$ ${game.price}`}</h2>
                                                </div>
                                        </div>
                                        )
                                    })
                                }
                            </ul>
                    </div>
                    <hr/>
                    <div className='individual-list-home'>
                        <h1> Our Indie Section </h1>   
                            <ul className='unordered-list-home'>
                                {
                                    videogamesBygenre?.slice(0,5).map(game =>{
                                        return(
                                            <div key={game.id} className='home-game-list'>
                                                <Link to={`/home/games/${game.id}`}>
                                                    <CardHover
                                                    name={game.name}
                                                    image={game.image}
                                                    />  
                                                </Link>
                                                <div>
                                                    <h3>{game.name}</h3>
                                                    <hr></hr>
                                                    <h2>{`$ ${game.price}`}</h2>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                    </div>
                    <hr></hr>
                    <div className='individual-list-home'>
                        <h1> Oldies </h1>
                            <ul className='unordered-list-home'>
                                {
                                    oldies?.slice(0,5).map(game => {
                                        return(
                                            <div key={game.id} className='home-game-list'>
                                                <Link to={`/home/games/${game.id}`}>
                                                    <CardHover
                                                    name={game.name}
                                                    image={game.image}
                                                    />  
                                                </Link>
                                                <div>
                                                    <h3>{game.name}</h3>
                                                    <hr></hr>
                                                    <h2>{`$ ${game.price}`}</h2>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                    </div> 
                </div>

                <hr></hr>

                <div className='carruseles'>
                    <h1 className='h'> For Online Gamers </h1>
                    <Carousel 
                        showArrows={true} 
                        autoPlay={true} 
                        interval={5000} 
                        infiniteLoop={true} 
                        stopOnHover={true} 
                        showThumbs={false}
                        width={1600}
                        dynamicHeight={true}
                        renderIndicator={false}
                        >
                        {
                            <div className='carrusel-triple'>
                                {
                                 videogamesBytag.map((game) => {
                                    return (
                                        <Link to={`/home/games/${game.id}`}>
                                            <CardDescription
                                            card={game}
                                            />
                                        </Link>
                                    )
                                })
                                }
                            </div>
                        }
                         {
                            <div className='carrusel-triple'>
                                {
                                 videogamesBytag.slice(3).map((game) => {
                                    return (
                                        <Link to={`/home/games/${game.id}`}>
                                            <CardDescription
                                            card={game}
                                            />
                                        </Link>
                                    )
                                })
                                }
                            </div>
                        }
                    </Carousel>
                </div >


                    {/* <div className='carruseles'>

                    <Carousel 
                        showArrows={true} 
                        animationHandler={'fade'} 
                        autoPlay={true} 
                        interval={5000} 
                        infiniteLoop={true} 
                        stopOnHover={true} 
                        showThumbs={false}
                        width={800}>
                        {
                            populars.map((game) => {
                                return (
                                                <div key={game.id}>
                                                        <p className="legend"> {game.price} {game.name} </p>
                                                        <img className='img-populars' src={game.image} alt='img'></img>
                                                        
                                                </div>
                                )
                            })
                        }
                    </Carousel>
                </div > */}

                {/* <Suscribe/> */}

            </div>
            :
            <LoadingScreen></LoadingScreen>
        }
    </div>
    )
}