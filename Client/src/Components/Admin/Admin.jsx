import CreateVideogame from '../CreateVideogame/CreateVideogames'
import './Admin.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { getAllGames, hideVideoGame,  showVideoGame, getAllDisableVideogame, getAllUsers, banUser, getAllBannedUsers, noBanUser, getAllNoBannedUsers, updateAdmin, clear } from '../../redux/Actions/Index'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ListVideogame from '../CreateVideogame/ListVideogame/ListVideogame'
import { useParams } from 'react-router-dom'
import CardHover from '../NewCard/CardHover'
import create from '../../Style/Imagenes/create.png'
import edit from '../../Style/Imagenes/edit.png'
import disabled from '../../Style/Imagenes/disabled.png'
import offer from '../../Style/Imagenes/offer.png'
import SendNews from '../SendNews/SendNews'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
//import swal from 'sweetalert';


export default function Admin() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [name, setName] = useState("")
    const videogames = useSelector(state => state.hidevideogames);
    const disableVideogames=useSelector(state=>state.getAlldisableGame)
    const allUsers = useSelector(state => state.allUsersNoBanned)
    const allBannedUsers = useSelector(state => state.allUsersBanned)
    const [show,setShow]=useState({
        disabled:false
    });
    // console.log(disableVideogames);

    const user = JSON.parse(localStorage.getItem("user"));

    const[render , setRender] = useState('edit')

    useEffect(() => {
        dispatch(getAllGames());
        dispatch(getAllDisableVideogame());
        dispatch(getAllUsers())
        dispatch(getAllBannedUsers())
        dispatch(getAllNoBannedUsers())
        return function () {
            dispatch(clear())
        }
    }, [dispatch, render])

    function handleSubmit(e) {
        e.preventDefault()

        dispatch(getAllGames(name))
        setName('')

    };
    function handleOnChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    //const videogamesAdmin= videogames.slice(0,8)
    //useEffect(()=>{
    // dispatch(getGameById(id))
    // },[dispatch,id])

    function handleHide(ev) {
        ev.preventDefault()
        dispatch(hideVideoGame(ev.target.value))
    }

    function showGame(e) {
        e.preventDefault()
        console.log(showVideoGame(e.target.value))
        dispatch(showVideoGame(e.target.value))

    }
    function handleSubmitOcultados(){
        setShow({...show,disabled:true})
        dispatch(getAllDisableVideogame());
    }
    function handleRegresar(){
        setShow({...show,disabled:false})
        // dispatch(getAllDisableVideogame());
    }
    function handleBanClick(a) {
         dispatch(banUser(a.target.value))
         setRender(`edit`)

    }
    function handleNoBanClick(a) {
        dispatch(noBanUser(a.target.value))
        setRender(`edit`)

    }
    function handleAdmin(a) {
        dispatch(updateAdmin(a.target.value))
    }
    // /disabled/:id

    //function handleChangeName(e){
    // e.preventDefault()
    //dispatch(changeName())
    // }


    return (
        <div className='Admin-conteiner'>
            {
                videogames[0]?
              <>  
                <div className='Admin-settings'>
                <aside className='Admin-aside'> 
                    <h2 className='adminUserH1'>Welcome {user.user.userName}</h2>
                    <img width={200} src={user.user.image} alt={user.user.id_name}></img>
                    <button className='button-40' onClick={() => setRender("admin")}> 
                        <div className='adminButtonStyleDiv'>
                        <img src={create} alt="create" width='20' className='adminImageButtonStyle'/>
                        <span>Create New Game </span>
                        </div>
                    </button>
                    <button className='button-40' onClick={() => setRender("edit")}> 
                        <div className='adminButtonStyleDiv'>
                        <img src={edit} alt="edit" width='20' className='adminImageButtonStyle'/>
                        <span>Edit Game</span>
                        </div>
                    
                    </button>
                    <button className='button-40' onClick={() => setRender("users")}>
                        <div className='adminButtonStyleDiv'>
                        <img src={edit} alt="edit" width='20' className='adminImageButtonStyle'/>
                        <span>Edit Users</span>
                        </div>
                    </button>
                    <button className='button-40' onClick={() => setRender("disableUsers")}>
                        <div className='adminButtonStyleDiv'>
                        <img src={disabled} alt="disabled" width='20' className='adminImageButtonStyle'/>
                        <span>Disabled Users</span>
                        </div>
                    </button>
                    <button className='button-40' onClick={() => setRender("offers")}>
                        <div className='adminButtonStyleDiv'>
                        <img src={offer} alt="disabled" width='20' className='adminImageButtonStyle'/>
                        <span>Send Offers</span>
                        </div>
                    </button>

                    
                </aside>
            </div>
            <div className="Admin-show-settings">
                    {
                        render && render === "admin" ?
                        // <DatosPerfil setUserLogged={setUserLogged} data={userdetails}></DatosPerfil>
                        <CreateVideogame></CreateVideogame>
                        :
                        render === "edit" ?
                        //pasar el boton de hacer esconder
                        <ListVideogame
                            handleOnChange={handleOnChange}
                            disableVideogames={disableVideogames}
                            handleSubmit={handleSubmit}
                            handleRegresar={handleRegresar} 
                            handleSubmitOcultados={handleSubmitOcultados} 
                            show={show}
                            videogames={videogames} 
                            name={name}
                            showGame={showGame}
                            handleHide={handleHide}
                        ></ListVideogame>
                        :
                        render === "users" ?
                        //falta el editar usuarios
                        <div>
                            <h2 className='adminUserH1'>Registered Users:</h2>
                            <div className='AdminAllUsersBiggestDiv'>
                            {allUsers.length ?
                                allUsers.map(e => 
                                    { return (
                                        
                                        <span className='adminUsersDivConfig'>
                                            <span className='adminUsersDivCard'>
                                            <img src={e.image} width='60' className='adminImgUserCard' alt='admin_image'></img>
                                            <span className='adminUserLastFlex'>
                                                <span className='adminSpanUserCard'>{e.userName}</span>
                                                <h3>USER ID:</h3> 
                                                <p>"{e.id_name}"</p>
                                                <h3>MAIL:</h3>
                                                <p>"{e.mail}"</p>
                                                <h3>CREATED AT:</h3>
                                                <p>"{e.createdAt}"</p>
                                                  
                                                    <button onClick={(a) => { if (window.confirm(`Are you sure to disable ${e.name} ?`))handleBanClick(a)}} value={e.mail} > Disable User</button>
                                                    <button onClick={(a) => { if (window.confirm(`Are you sure to set ${e.name} as admin ?`))handleAdmin(a)}} value={e.mail}> Set User As Admin</button>
                                            </span>
                                            
                                            </span>
                                        </span>
                                    )}
                                ) : <h4>There's no users registered</h4>}</div>
                        </div>
                        :
                        render === 'editgame' ?
                        null
                        :
                        render === 'offers' ?
                        <SendNews/>
                        :
                        render === 'disableUsers' ?
                        <div>
                            <h2 className='adminUserH1'>Banned Users:</h2>
                            <div className='AdminAllUsersBiggestDiv'>
                            {allBannedUsers.length ?
                                allBannedUsers.map(e => 
                                    {
                                        return (
                                        <span key={e.id_name} className='adminUsersDivConfig'>
                                            <span className='adminUsersDivCard'>
                                            <img src={e.image} width='60' className='adminImgUserCard' alt='user_image'></img>
                                            <span className='adminUserLastFlex'>
                                                <span className='adminSpanUserCard'>{e.userName}</span>
                                                <h3>USER ID:</h3> 
                                                <p>"{e.id_name}"</p>
                                                <h3>MAIL:</h3>
                                                <p>"{e.mail}"</p>
                                                <h3>CREATED AT:</h3>
                                                <p>"{e.createdAt}"</p>
                                                
                                                <button onClick={(a) => { if (window.confirm(`Are you sure to enable ${e.name} ?`)) handleNoBanClick(a)}} value={e.mail} >Enable User</button>


                                            </span>
                                            
                                            </span>
                                        </span>
                                    )}
                                ) : <h4>There's no banned users</h4>}</div>
                        </div>
                        :
                        null
                    }

        </div>
                
        </>        
                
                :<LoadingScreen></LoadingScreen>
            }
        </div>
    )
}
