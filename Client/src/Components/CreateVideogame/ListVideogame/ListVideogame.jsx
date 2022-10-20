
import React from "react"
import './ListVideogame.css';
import CardHover from "../../NewCard/CardHover";
import { Link } from "react-router-dom";

export default function ListVideogame({ showGame, handleHide, handleOnChange, disableVideogames, handleSubmit, handleRegresar, handleSubmitOcultados, show, videogames, name}){

  // function handleHide(e){
  //   e.preventDefault()
  //   dispatch(hideVideoGame(props.id))
  // }
  // function handleChangeName(e){
  //   e.preventDefault()
  //   dispatch(changeName())
  // }


  return(
    <div>
    <div className='searchbar-admin'>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                id="search"
                className="searchInputAdmin"
                type="text"
                value={name}
                onChange={(e) => handleOnChange(e)}
                placeholder="Buscar videojuego..."
            />
              <button id="button-86" className='listAdminButton' type="submit"> Search </button>
        </form>
        {
        (!show.disabled) && (<button id="button-86" className='listAdminButton' onClick={()=>handleSubmitOcultados()}>Disabled Games</button>)
        }
        {
        (show.disabled) && (<button id="button-86" className='listAdminButton' onClick={()=>handleRegresar()}>Go Back</button>)
        }
    </div> 

<div className="admin-games">
    { 
      
      (!show.disabled) &&( videogames?.map(item => {
                return (
                    <div className="card-videogame-admin">
                        <CardHover
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        />
                        <div>
                        <Link to={`/admin/editgame/${item.id}`}>
                            <button id="button-86" className="listVideoGamesButtonStyle" type="button" >Edit </button>
                        </Link>
                        {/* <Link to= {`/admin/${item.id}`}> */}
                        <button id="button-86" className="listVideoGamesButtonStyle" type="button" onClick={(ev) => handleHide(ev)} value={item.id}> Disable </button>
                        <button id="button-86" className="listVideoGamesButtonStyle" type="button" onClick={(e) => showGame(e)} value={item.id}> Enable </button>
                      </div>
                    </div>
                )
            })
            )?(!show.disabled) &&( videogames?.map(item => {
                return (
                    <div className="card-videogame-admin">
                        <CardHover
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        />
                        <div className="buttons">
                        <Link to={`/admin/editgame/${item.id}`}>
                            <button id="button-86" type="button" className="listVideoGamesButtonStyle" >Edit </button>
                        </Link>
                        {/* <Link to= {`/admin/${item.id}`}> */}
                         {/* <button id="button-86"  type="button"   onClick={(e) => showGame(e)} value={item.id}> Habilitar </button> */}

                        <button id="button-86" type="button" className="listVideoGamesButtonStyle" onClick={(ev) => { if (window.confirm(`Are you sure to disable ${item.name} ?`))handleHide(ev)}} value={item.id}> Disable </button>

                      </div>
                  </div>
                )
            })
            ):(show.disabled) &&( disableVideogames?.map(item => {
                return (
                    <div className="card-videogame-admin">
                        <CardHover
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        />
                        <div className="buttons">
                        <Link to={`/admin/editgame/${item.id}`}>
                            <button id="button-86"  type="button" className="listVideoGamesButtonStyle" >Edit </button>
                        </Link>
                        {/* <Link to= {`/admin/${item.id}`}> */}
                        {/* <button id="button-86"  type="button"  onClick={(ev) => handleHide(ev)} value={item.id}> Deshabilitar </button> */}

                        <button id="button-86"  type="button"  className="listVideoGamesButtonStyle" onClick={(e) => { if (window.confirm(`Are you sure to enable ${item.name} ?`))showGame(e)}} value={item.id}> Enable </button>

                      </div>
                  </div>
                  )
            })
            )
    }                                     
</div>

</div> 
      )
      }