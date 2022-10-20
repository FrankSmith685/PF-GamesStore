import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, modificarUser } from '../../redux/Actions/Index'
import swal from "sweetalert";
//import CardHover from "../NewCard/CardHover.jsx"

export default function DatosPerfil({ setUserLogged, data }) {

    let { name, lastName, address, mail, userName, id_name, banned } = data

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ first: true })

    const [input, setInput] = useState({})

    function handleInput(event) {
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validations({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const validations = (input) => { // VARIABLE PARA GUARDAR UN MENSAJE EN CASO DE FALTANTES DEL INPUT
        let errors = {}
        for (const key in input) {
            if (!input[key]) {
                errors[key] = `Is ${key} required`
            }
            else if (input[key]?.trim().length < 3) { //el .trim() saca los espacios del inicio y el fin de la palabra
                errors[key] = "Must be at least 3 characters"
            }
            else if ((/[^a-zA-Z0-9 ]/.test(input[key]))) { //validacion para que el name no pueda contener caracteres especiales
                console.log("INPUT KEY VALIDATION", key)
                if (key !== "image") {
                    errors[key] = "Can't contain special characters"
                }
            }
        }
        return errors
    }

    function handleSubmit(event) {
        event.preventDefault()
        let error = validations(input)
        let error2 = Object.keys(error)

        if (error2.length > 0) {
            swal({ title: 'Debe salvar errores' })
        }
        else if (Object.keys(input).length === 0) {
            swal({ title: "Nothing to edit" })
        }
        else {
            dispatch(modificarUser(id_name, input))
            swal({ title: "User edited!" })
            setInput({})
            navigate("/home/games");
        }
    }

    function deleteUserFromDB(id_name) {
        setUserLogged(false)
        dispatch(deleteUser(id_name))
        swal({ title: "User deleted!" })
        navigate("/home/games");
    }

    const [form, setForm] = useState("")

    function abrirForm(event, nombreDelInput) {
        event.preventDefault()
        setForm(nombreDelInput)
    }

    async function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            console.log("TARGET FILE", e.target.files[0])
            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", "gamesAPI")
            fetch(
                "https://api.cloudinary.com/v1_1/luubermudezz/image/upload", {
                method: "POST",
                body: data
            }
            ).then(resp => resp.json())
                .then(file => {
                    if (file) {
                        setInput({
                            ...input,
                            image: `${file.secure_url}`
                        })
                    }
                })
        }
    }

    console.log("DATA", data)

    return (
        <div className="modificar_perfil">
            <h1>My profile</h1>
            <div>
                <h2>{mail}</h2>
                {
                    banned === false ?
                    <h2>You're ✔ Online ✔</h2>
                    :
                    <h2>You're ⛔Banned⛔</h2>
                }
            </div>
            <hr></hr>
            <form onSubmit={(event) => handleSubmit(event)} className="Form">
                <div className="Label">
                    <h2>User</h2>
                    <label>{userName}</label>
                    <button onClick={(event) => abrirForm(event, "user name")}>Edit</button>
                    {
                        form && form === "user name" ?
                            <div>
                                <input
                                    id="User"
                                    type='text'
                                    size="20"
                                    value={input.userName}
                                    name='userName'
                                    placeholder="User..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {
                                    !errors.userName ? null : <span>{errors.userName}</span>
                                }
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }
                </div>
                <hr></hr>
                <div className="Label">
                    <h2>Name</h2>
                    <label>{name}</label>
                    <button onClick={(event) => abrirForm(event, "name")}>Edit</button>
                    {
                        form && form === "name" ?
                            <div>
                                <input
                                    required
                                    id="Name"
                                    type='text'
                                    size="20"
                                    value={input.name}
                                    name='name'
                                    placeholder="Name..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {
                                    !errors.name ? null : <span>{errors.name}</span>
                                }
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }

                </div>
                <hr></hr>
                <div className="Label">
                    <h2>Last name</h2>
                    <label>{lastName}</label>
                    <button onClick={(event) => abrirForm(event, "last name")}>Edit</button>
                    {
                        form && form === "last name" ?
                            <div>
                                <input
                                    id="Last name"
                                    type='text'
                                    size="40"
                                    value={input.lastName}
                                    name='lastName'
                                    placeholder="Last name..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {
                                    !errors.lastName ? null : <span>{errors.lastName}</span>
                                }
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }

                </div>
                <hr></hr>
                <div className="Label">
                    <h2>Address</h2>
                    <label>{address}</label>
                    <button onClick={(event) => abrirForm(event, "address")}>Edit</button>
                    {
                        form && form === "address" ?
                            <div>
                                <input
                                    id="Address"
                                    type='text'
                                    size="40"
                                    value={input.address}
                                    name='address'
                                    placeholder="Address..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {
                                    !errors.userName ? null : <span>{errors.userName}</span>
                                }
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }
                </div>
                <hr></hr>
                <div className="Label">
                    <h2>User image</h2>
                    <button onClick={(event) => abrirForm(event, "image")}>Edit</button>
                    {
                        form && form === "image" ?
                            <div>
                                <input
                                    type='file'
                                    size="80"

                                    name='image'
                                    placeholder="Insert a image URL"
                                    onChange={(event) => handleImageChange(event)}
                                />
                                {
                                    !errors.image ? null : <span>{errors.image}</span>
                                }
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }
                </div>
                <hr></hr>
                <button id="submit" type="submit">Edit User</button>
            </form>
            <button id="delete_user" onClick={() => { if (window.confirm("Are you sure to delete your profile user?")) deleteUserFromDB(id_name) }}>Delete user</button>
        </div>
    )
}