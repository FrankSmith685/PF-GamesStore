// import React from 'react'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { postNewUser } from '../../redux/Actions/Index'
// import "./Register.css"
// import swal from 'sweetalert'

// const Register = () => {
//     const dispatch= useDispatch()
//     const [image, setImage] = useState("");
//     const [loading, setLoading] = useState(false);

//     const [newUser, setNewUser] = useState({
//         userName: "",
//         mail: "",
//         password: "",
//         name: "",
//         lastName: "",
//         address: "",
//         image: image
//     })


//   function onClickCheckbox(e){
//     if(image !== "") {
//         setNewUser({...newUser, ["image"]: image})
//        }
//   }

//     const uploadImage = async (e) => {
//         const files = e.target.files
//         const data = new FormData();
//         data.append("file", files[0])
//         data.append("upload_preset", "gamesAPI")
//         setLoading(true)
//         const result = await fetch(
//             "https://api.cloudinary.com/v1_1/luubermudezz/image/upload", {
//                 method: "POST",
//                 body: data
//                 // mode: 'no-cors'
//             }
//         )
//         const file = await result.json()
//         // console.log(result)
//         setImage(file.secure_url)
//         setLoading(false)

//     }

//     function handleChange(e) {
//         e.preventDefault(e)
//         if(e.target.name !== "image") {
//             let usuario = {...newUser}
//             usuario[e.target.name] = e.target.value 
//             setNewUser({...newUser, [e.target.name]: e.target.value})
//         }
//         else {
//             return console.log('falta enviar datos')
//         }

//     }


//     function handleSubmit(e) {
//         e.preventDefault()
//             dispatch(postNewUser(newUser))
//             swal({title:'registrado bro'})   
//     }



//   return (
//     <div className='divFormRegister'>
//         <form className='formRegister' onSubmit={(e) => handleSubmit(e)} >
//             <label>Profile Photo:</label>
//             <input  name="image" type="file" placeholder='Choose File' onChange={uploadImage} id="profile-photo" />
//             {loading ? (<p>Uploading your image...</p>) : 
//             <div>
//                 <img src={image} style={{width: "300px"}} alt='asdf'/>
//                 <label><input type="checkbox" onChange={(e) => onClickCheckbox(e)}/>
//                 Confirmar imagen</label>
//             </div>}
//             <label type="text" >UserName:</label>
//             <input name="userName" onChange={(e) => handleChange(e)}></input>
//             <label type="text" >Name:</label>
//             <input name="name" onChange={(e) => handleChange(e)} ></input>
//             <label type="text" >LastName:</label>
//             <input name="lastName" onChange={(e) => handleChange(e)} ></input>
//             <label type="text" >Mail:</label>
//             <input name="mail" onChange={(e) => handleChange(e)} ></input>
//             <label>password:</label>
//             <input name="password" type="text"  onChange={(e) => handleChange(e)}></input>
//             <label>address:</label>
//             <input name="address" type="text"  onChange={(e) => handleChange(e)}></input>
//             <button type="submit" className='buttonFormRegister' > REGISTER </button>

//         </form>
//     </div>
//   )
// }

// export default Register