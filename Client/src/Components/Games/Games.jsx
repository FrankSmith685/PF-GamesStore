import './Games.css'
import Cards from '../Cards/Cards.jsx'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGenres, getPlatforms, order, getTags, savePageGlobal } from '../../redux/Actions/Index'
import { useState } from 'react';
import Paginado from '../Paginado/Paginado';
import Filter from '../Filter/Filter';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import icon from '../../Style/Imagenes/Icon.PNG'

export default function Games({currentPage, setCurrentPage}) {

    let dispatch = useDispatch()
    
    let allvideogames = useSelector(state => state.Allvideogames)
    let videogames = useSelector(state => state.videogames)
    let tags = useSelector(state => state.tags)
    let genres = useSelector(state => state.genres)
    let platforms = useSelector(state => state.platforms)
    let favorites = useSelector(state => state.favorites)

    const [render, setRender] = useState('')
   
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
        dispatch(getTags())
        if (allvideogames.length === 0) {
            dispatch(getAllGames())
        }
        // return function cleaning() {
        //     dispatch(clear())
        // }
        return function cleaning() {
            dispatch(savePageGlobal(currentPage))
        }
    }, [dispatch, allvideogames.length, currentPage])


    //paginado
    const videogamesPerPage = 10

    //videojuegos filtradas por pagina
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    const currentVideogame = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleSort(e) {
        e.preventDefault();
        let orderBy = document.getElementById('orderBy').value
        let orderType = document.getElementById('orderType').value
        dispatch(order({ orderBy: orderBy, orderType: orderType }));
        setCurrentPage(1);
        setRender(`VAMOS ${render} VAMOS`);
    }


    return (
        <div className='Search-Filters'>
            {
                allvideogames.length > 0 ?
                    <div className='filters-games'>
                        <div className="show-filters">

                            <Filter
                                genres={genres}
                                platforms={platforms}
                                tags={tags}
                                setRender={el => setRender(el + render)}
                                setCurrentPage={setCurrentPage}
                                handleSort={handleSort}
                            />

                        </div>
                        <div className='Sorts-Games'>
                            <div className='PAGINADO'>
                                <Paginado
                                    VideogamesPerPage={videogamesPerPage}
                                    allVideogames={videogames.length}
                                    paginado={paginado}
                                    currentPage={currentPage}
                                />
                            </div>
                            <div className='Games-Cards-Div'>
                                {
                                    typeof currentVideogame === "object" ?

                                        currentVideogame.length > 0 ?

                                            currentVideogame?.map(card => {
                                                return (<Cards
                                                    favorites={favorites}
                                                    card={card}
                                                    key={card.id}
                                                />)
                                            })
                                            :
                                            <LoadingScreen></LoadingScreen>
                                        :
                                        <div id='contenedor_no_games'>
                                            <h1 id='NO_GAMES'> NO GAMES MATCH YOUR REQUISITES </h1>
                                            <img src={icon} alt="icono_game_store" id='icono_game_store'></img>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <LoadingScreen></LoadingScreen>
            }

        </div>
    )
}