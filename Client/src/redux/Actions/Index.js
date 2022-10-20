import swal from 'sweetalert'
const axios = require('axios');
export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const GET_ALL_GAMES_BY_NAME = 'GET_ALL_GAMES_BY_NAME'
export const GET_GAME_BY_ID = 'GET_GAME_BY_ID'
export const CLEAR = 'CLEAR'
export const GET_GENRES = 'GET_GENRES'
export const GET_TAGS = 'GET_TAGS'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const GET_GAMES_BY_GENRE = 'GET_GAMES_BY_GENRE'
export const FILTER_GAMES_BY_PLATFORM = 'FILTER_GAMES_BY_PLATFORM'
export const FILTER_GAMES_BY_TAGS = 'FILTER_GAMES_BY_TAGS'
export const ORDER = 'ORDER'
export const CREATE_GAME = 'CREATE_GAME'
export const FILTER_GAMES = 'FILTER_GAMES'
export const EMPTY_GAME_STATE = 'EMPTY_GAME_STATE'
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FOR_CART = 'DELETE_FOR_CART'
export const DELETE_FOR_FAVS = "DELETE_FOR_FAVS"
export const ADD_TO_FAV = "ADD_TO_FAV"
export const ACTUALIZAR_CART = "ACTUALIZAR_CART"
export const ACTUALIZAR_FAV = "ACTUALIZAR_FAV"
export const POST_VIDEOGAME= "POST_VIDEOGAME"
export const SHOW_VIDEOGAME= "SHOW_VIDEOGAME"
export const HIDE_VIDEOGAME= "HIDE_VIDEOGAME"
export const CHANGE_NAME= "CHANGE_NAME"
export const GET_USER = 'GET_USER'
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const CLEAR_USER = 'CLEAR_USER'
export const GET_REVIEWS_GAME = "GET_REVIEWS_GAME"
export const GET_GAMES_BY_TAG = 'GET_GAME_BY_TAG'
export const GET_ALL_DISABLE_VIDEOGAME='GET_ALL_DISABLE_VIDEOGAME'
export const GET_ORDERS = "GET_ORDERS"
export const GET_USERS_BANNED= 'GET_USERS_BANNED'
export const GET_NO_BANNED_ALL_USERS = 'GET_NO_BANNED_ALL_USERS'
export const EMPTY_VIDEOGAMES = "EMPTY_VIDEOGAMES"
export const GET_MAILS= "GET_MAILS"
export const GET_ALL_MAILS_NEWS="GET_ALL_MAILS_NEWS"
export const SAVE_PAGE_GLOBAL= "SAVE_PAGE_GLOBAL"
export const PUTVIDEOGAME="PUTVIDEOGAME"



require('dotenv').config();
const {
    REACT_APP_API
} = process.env;

export function getAllGames(name) {

    if (name) {
        return async function (dispatch) {
            try {
                let response = await axios(`/videogames?name=${name}`)
                dispatch({
                    type: GET_ALL_GAMES_BY_NAME,
                    payload: response.data
                })
            } catch (error) {
                dispatch({
                    type: GET_ALL_GAMES_BY_NAME,
                    payload: "NO HAY JUEGOS PA"
                })
            }
        }
    } else {
        return async function (dispatch) {
            let response = await axios(`/videogames`)
            dispatch({
                type: GET_ALL_GAMES,
                payload: response.data
            })
        }
    }
}

export function getAllBannedUsers () {
    return async function (dispatch) {
        let res = await axios.get('/banned')
        dispatch({
            type: GET_USERS_BANNED,
            payload: res.data
        })
    }
}
export function getAllMailsNews () {
    return async function (dispatch) {
        let res = await axios.get('/newsletter')
        dispatch({
            type: GET_ALL_MAILS_NEWS,
            payload: res.data
        })
    }
}



export function getGameById(id) {
    return async function (dispatch) {
        let response = await axios(`/videogames/${id}`)
        dispatch({
            type: GET_GAME_BY_ID,
            payload: response.data
        })
    }
}

export function getMails(){
    return async function(dispatch){
        let res= await axios(`/newsletter`)
        dispatch({
            type: GET_MAILS,
            payload: res.data
        })
    }

}


export function hideVideoGame(id){
    return async function(dispatch){
        await axios.put(`/disabled/${id}`)
        dispatch({type:HIDE_VIDEOGAME, payload: id})
    }
}

export function showVideoGame(id) {
    return async function (dispatch) {
        await axios.put(`/abled/${id}`)
        dispatch({type: SHOW_VIDEOGAME, payload: id})
    }
}

export function getAllDisableVideogame(){
    return async(dispatch)=>{
        const json=await axios.get("/disabled");
            return dispatch({
                type:GET_ALL_DISABLE_VIDEOGAME,
                payload:json.data
            })
    }
}
// export const getOcultar=(id)=>{
//     // console.log(id)
//     return async function(dispatch){
//         await axios.put(`/disabled/${id}`)
//         // console.log(ss.data);
//         dispatch({type:GET_OCULTAR, payload:id})
//     }


export const clear = function () {
    return {
        type: CLEAR
    }
}

export const filterGames = function (payload) {

    return {
        type: FILTER_GAMES,
        payload
    }

}

export const getGenres = function () {
    return function (dispatch) {
        axios.get('/genres')
            .then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_GENRES,
                    payload: resp
                })
            })
            .catch(err => console.log(err))

        // fetch(`${REACT_APP_API}/genres`)
        // .then(resp => resp.json())
        // .then(resp => {
        //     dispatch({
        //         type: GET_GENRES,
        //         payload: resp
        //     })
        // })
    }
}
export const getPlatforms = function () {
    return function (dispatch) {
        axios.get('/plataforms')
            .then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_PLATFORMS,
                    payload: resp
                })
            })

        // fetch(`${REACT_APP_API}/plataforms`)
        // .then(resp => resp.json())
        // .then(resp => {
        //     dispatch({
        //         type: GET_PLATFORMS,
        //         payload: resp
        //     })
        // })
    }
}

export const order = function (payload) {
    return {
        type: ORDER,
        payload
    }
}

export function postNewUser(user) {
    return async function () {
        try {
            await axios.post(`/newUser`, user)
            console.log(user)
        } catch (err) {
            console.log(err)
        }
    }
}

export const Getbygenre = function (genre) {
    return function (dispatch) {
        axios.get(`/videogames?genres=${genre}`)
            .then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_GAMES_BY_GENRE,
                    payload: resp
                })
            })
            .catch(err => console.log(err))
    }
}

export const Getbytag = function (tag) {
    return function (dispatch) {
        axios.get(`/videogames?tag=${tag}`)
            .then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_GAMES_BY_TAG,
                    payload: resp
                })
            })
            .catch(err => console.log(err))
    }
}

export const filterGamesByTags = function (payload) {
    return {
        type: FILTER_GAMES_BY_TAGS,
        payload
    }
}

export function vaciarGame() {
    return {
        type: EMPTY_GAME_STATE,
    }
}

export function clearVideogames() {
    return {
        type: EMPTY_VIDEOGAMES,
    }
}

export function postVideoGame(payload){
    return async function(dispatch){
        await axios.post("/videogames",payload)
       return dispatch({type: POST_VIDEOGAME, payload})
     }
}


export function changeName(payload){
    return async function(dispatch){
        await axios.get("/changename/:gameId?",payload)
        return dispatch({type:CHANGE_NAME,payload})
    }
}

export const getAllUsers = function () {
    return function (dispatch) {
        axios.get('/newUser')
            .then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_ALL_USERS,
                    payload:resp
                })
            })
    }
}

export const getTags = function () {
    return function (dispatch) {
        axios.get('/tags')
            .then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_TAGS,
                    payload: resp
                })
            })
            .catch(err => console.log(err))

        // fetch(`${REACT_APP_API}/tags`)
        // .then(resp => resp.json())
        // .then(resp => {
        //     dispatch({
        //         type: GET_TAGS,
        //         payload: resp,
        //     })
        // })
    }
}

export function actualizarCart(game) {
    return {
        type: ACTUALIZAR_CART,
        payload: game
    }
}

export function addToCart(game) {
    return {
        type: ADD_TO_CART,
        payload: game
    }
}

export function deleteItemFromCart(id) {
    return {
        type: DELETE_FOR_CART,
        payload: id
    }
}

export function actualizarFav(game) {
    return {
        type: ACTUALIZAR_FAV,
        payload: game
    }
}

export function addToFav(game) {
    return {
        type: ADD_TO_FAV,
        payload: game
    }
}

export function deleteItemFromFavs(id) {
    return {
        type: DELETE_FOR_FAVS,
        payload: id,
    }
}

// export function signin(payload) {
//     return function () {
//         axios.post(`/login`, payload)
//             .then(resp => resp.data)
//             .then(resp => {
//                 localStorage.setItem('user', JSON.stringify(resp))
//                 window.location.reload()
//             })
//             .catch(err => console.log(payload))
//     }
// }

export function getUser (payload) {
    return function (dispatch) {
        axios.get(`/userLogged/${payload}`)
        .then(resp => resp.data)
        .then(resp => {
            dispatch({
                type: GET_USER,
                payload: resp
            })
        })
        .catch(err => console.log(payload))
    }
}
export function clearUser() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_USER
        })
    }
}

export function getReviews(gameId){
    return async function(dispatch){
        let response = await axios.get(`/reviews/${gameId}`)
        return dispatch({
            type: GET_REVIEWS_GAME,
            payload: response.data
        })
    }
}

export function getOrders(user_id){
    console.log("ACTION ORDER", user_id)
    return async function(dispatch){
        let response = await axios.get(`/orders/${user_id}`)
        return dispatch({
            type: GET_ORDERS,
            payload: response.data
        })
    }
}



export function modificarUser(id_name,payload) {
    return function () {
        axios.put(`/newUser/${id_name}`, payload)
    }
}

export function deleteUser(id_name) {
    return function () {
        axios.delete(`/newUser/${id_name}`)
    }
}

export function postReview(id_game, payload) {
    return function () {
        axios.post(`/reviews/${id_game}/add`, payload)
    }
}

export function banUser(mail) {
    return function(){
        axios.put(`/banned/${mail}`)
        .then(swal({title:'user disabled'}))
    }
}

export function noBanUser(mail) {
    return function(){
        axios.put(`/noBanned/${mail}`)
        .then(swal({title:'user enabled'}))
    }
}
export function updateAdmin(mail) {
    return function (){
        axios.put(`/admin/${mail}`)
        .then(swal({title:'user is now admin'}))
    }
}

export const getAllNoBannedUsers = function () {
        return async function (dispatch) {
            let res = await axios.get('/newUser/noBanned')
            dispatch({
                type: GET_NO_BANNED_ALL_USERS,
                payload: res.data
            })
        }
    
}

export function savePageGlobal(numero) {
    return function (dispatch) {
        dispatch({
            type: SAVE_PAGE_GLOBAL,
            payload: numero
        })
    }
}

export function modificarGame(id,payload){
    return  function(){
        axios.put(`videogames/update/${id}`,payload)
        // dispatch({type:PUTVIDEOGAME, payload: id})
    }
}