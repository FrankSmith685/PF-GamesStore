import axios from 'axios'
import { useState } from 'react'
import './Suscribe.css'
import swal from 'sweetalert';
import { useEffect } from 'react';


export default function Suscribe ({userLogged}) {

    let usermail = JSON.parse(localStorage.getItem('user'))
    const [input, setInput] = useState({
        mail: ''
    })

  

    const [loading, setLoading] = useState(false)
    function handleChange(e) {
        setInput({
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        let emails = await axios.get('/newsletter').then(res => res.data).then(res => res)
        console.log('los emails son', emails)
        if(emails.map(el => el.mail).includes(input.mail)){
            setLoading(false)
            return swal({title:'Already Suscribed ! '})
        }
        if(userLogged){
            setInput({
                mail: usermail.user.mail
            })
        }
            axios.post('/newsletter', input)
            .then(resp => resp.data)
            .then(resp => {
                console.log('newsletter', resp)
                swal({title:'Thanks for suscribing ! '})
                setLoading(false)
             })
             .catch(error => {
                setLoading(false)
                console.log('suscripcion fallida', error) 
            })
    }





    return (
        <section className="wrapper">
        <div className="content">
                <header>
                  <h1>Subscribe Us</h1>
                </header>
            <section>
                <p>
                    Suscribe to our newsletter and stay updated.
                </p>
            </section>
            <form onSubmit={e => handleSubmit(e)}>
            {
                userLogged ?
                <input className='input-disabled' disabled={true} placeholder='Email' name='mail' required onChange={(e) => handleChange(e)}></input>
                :
                <input placeholder='Email' name='mail' required onChange={(e) => handleChange(e)}></input>
            }
                {!loading ? <button  type='submit'> Suscribe </button> : <button  disabled={true} type='submit'> Loading... </button>}
            </form>
        </div>
    </section>
    )
}