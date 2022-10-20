import { useState } from "react"
import Modal from "react-modal"
import '../UserSign/UserSign.css'
import Icon from '../../Style/Imagenes/Icon.PNG'
import { postNewUser } from "../../redux/Actions/Index"
import { useDispatch } from "react-redux"
import swal from 'sweetalert';

export default function Useregister ({registersetIsOpen, registerisOpen}) {

  
    const [error, setError] = useState({nuevo: true})
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState({
        userName: "",
        mail: "",
        password: "",
        name: "",
        lastName: "",
        address: "",
        image: 'https://pbs.twimg.com/profile_images/831173492968140804/43M7c5j__400x400.jpg'
    })

    function toggleModal () {
        registersetIsOpen(false)
    }

    function handleChange(e) {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
        setError(validateFields({...newUser, 
            [e.target.name]: e.target.value}))
        
    }

   async function handleImageChange(e){
        if(e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
            setLoading(true)
            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", "gamesAPI")
            fetch (
                "https://api.cloudinary.com/v1_1/luubermudezz/image/upload", {
                 method: "POST",
                 body: data
                 // mode: 'no-cors'
                }
            ).then(resp => resp.json())
                    .then(file => {
                        if(file) {
                        setNewUser({
                        ...newUser,
                        image: `${file.secure_url}`
                        })
                        setLoading(false)
                    }
                    })
            // const file = await resp.json()
            
            
        }
    }

    function validateFields(input) {
        let errores = {}
        for(let keys in input) {
            if(!input[keys]) errores[keys] = `${keys} is required`
        }
        return errores
      }


    function handleSubmit(e) {
        e.preventDefault()
        setShowError(true)
        dispatch(postNewUser(newUser))
        console.log('el nuevo usario es',newUser)
        
         swal({title:`${newUser.userName} you have been succesfully been registred`})
        setNewUser({
            userName: "",
            mail: "",
            password: "",
            name: "",
            lastName: "",
            address: "",
            image: 'https://pbs.twimg.com/profile_images/831173492968140804/43M7c5j__400x400.jpg'
        })
        window.location.reload()
    }

    return (
        <div>
            <Modal
            isOpen={registerisOpen}
            onRequestClose={toggleModal}
            contentlabel="My dialog"
            className="mymodalregister"
            overlayClassName="myoverlay" 
            >
                <div>
                <div className="modal-welcome">
                    <img src={Icon} className='iconito-de-sergio' alt='iconito de Sergio'/>
                    <hr></hr>
                    <h2>Create your Account</h2>
                </div>  
                <hr></hr>
                    <form className='formRegister' onSubmit={(e) => handleSubmit(e)} >
                        <div className="name-and-lastname">
                            <div className="input-div">
                                <label type="text" ></label>
                                <input className="input-register-half" name="name" placeholder="Name" required onChange={(e)  => handleChange(e)} ></input>
                            </div>
                            {error.name ? <span className='error'>{error.name}</span> : null}
                            <div className="input-div">
                                <label type="text"></label>
                                <input className="input-register-half" name="lastName" placeholder="Lastname" required onChange={(e) => handleChange(e)} ></input>
                            </div>
                            {!showError  ? null : <span className='error'>{error.lastName}</span>}
                        </div>
                        <div className="input-div">
                            <label type="text" ></label>
                            <input className="input-register" name="userName" placeholder="Username" required onChange={(e) => handleChange(e)}></input>
                        </div>
                        {!showError  ? null : <span className='error'>{error.userName}</span>}
                        <div className="input-div">
                            <label></label>
                            <input className="input-register" name="password" type="password" required placeholder="Password" onChange={(e) => handleChange(e)}></input>
                        </div>
                        {!showError  ? null : <span className='error'>{error.password}</span>}
                        <div className="input-div">
                            <label type="text" ></label>
                            <input className="input-register" name="mail" placeholder="E-mail" required onChange={(e) => handleChange(e)} ></input>
                        </div>
                        {!showError  ? null : <span className='error'>{error.mail}</span>}
                        <div className="input-div">
                            <label></label>
                            <input className="input-register" name="address" placeholder="Adress" type="text" onChange={(e) => handleChange(e)}></input>
                        </div >
                        {!showError  ? null : <span className='error'>{error.address}</span>}
                        <div className="input-div">
                            <label className='input-label-create' htmlFor="image">Image</label>
                            <input className="input-register" name="image" type="file" onChange={handleImageChange}/>
                        </div>
                        {!showError  ? null : <span className='error'>{error.image}</span>}
                        {/* <button className='submit-btn' type="submit">REGISTER</button> */}
                         {!loading && !Object.keys(error).length ? <button className='submit-btn' type="submit">REGISTER</button> : <button className='submit-btn' type="submit" disabled={true}>REGISTER</button>} 
                    </form>
                </div>
            </Modal>
        </div>
    )
}