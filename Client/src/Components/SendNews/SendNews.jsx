import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './SendNews.css'
import { getAllMailsNews } from '../../redux/Actions/Index'
import { useState } from 'react'
import axios from 'axios'


const SendNews = () => {
 const dispatch= useDispatch()
 const mailsNews= useSelector(state=>state.mailsNews)
 const [mails, setMails] = useState([])
 const [input, setInput] = useState('')
 const [loading, setLoading] = useState(false)

useEffect(() => {
   dispatch(getAllMailsNews());
}, [dispatch])

useEffect(() => {
     let mailing = document.getElementById('divToAppendMails')
     let sending = mails.join([', '])
     mailing.innerHTML=`${sending}`
}, [mails])

function onChangeEmail(ev){
  ev.preventDefault()
  if(!mails?.includes(ev.target.value) && ev.target.value !== "All") {
    setMails([...mails, ev.target.value])
  }

}


function handleSubmit(ev) {
  ev.preventDefault()
  setLoading(true)
  axios.post('/sendNewsletter', {mails:mails, emailHtml:input} ).then(resp => resp.data)
  .then(resp => {
    setLoading(false)
    console.log(resp)
  })
  .catch(err => {
    console.log(err)
    setLoading(false)
  })
}

function handleChange(e) {
  setInput(e.target.value)
  console.log(input)
}


  return (
    <div className='firstDivFormSendNews'>
    <h3 className='titleSendNewOffer'>Send your newsletter:</h3>
    <form onSubmit={(ev) => handleSubmit(ev)}> 
      <div className='divFormSendNews'>
      <textarea placeholder="Write and email" rows="10" cols="70" onChange={e => handleChange(e)}></textarea>
      <label>Emails:</label>
      <select name="mails" onChange={(ev)=>onChangeEmail(ev)} className='buttonSendNewsForm'>
      <option value="All">select user:</option>
      {mailsNews.map(ev=>{
            return(
                <option value={ev.mail} key={ev.id} > {ev.mail} </option>
            )
        })}
      </select>
      <div className='divMailsAdded'>
        <h4>You'll send newsletter to:</h4>
        <div id='divToAppendMails'>

        </div>
      </div>
      {
        loading ?
        <button disabled={true} type='submit' className='buttonSendNewsForm'> Loading </button>
        :
        <button type='submit' className='buttonSendNewsForm' >Send Email</button>
      }
      </div>
    </form>
    {/* <img src={}></img> */}

    </div>

  )

      }


export default SendNews