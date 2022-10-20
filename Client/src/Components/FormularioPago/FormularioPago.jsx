import React from "react";
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import './formularioPago.css';
import Cart from "../Cart/Cart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart } from "../../redux/Actions/Index";
import { useEffect } from "react";
import CardHover from "../NewCard/CardHover";
import swal from 'sweetalert'
const {
  REACT_APP_API
} = process.env;




export const FormularioPago = () => {
  // const elements=useElements();
   const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)
  const cart = useSelector(state => state.cart)

  const precioTotal = JSON.parse(localStorage.getItem("precioTotal"));
  const items = JSON.parse(localStorage.getItem("products"))
  const user = JSON.parse(localStorage.getItem("user"))
  const mail = user.user.mail
  const userIdName = user.user.id_name

   const arr = [items.map(e => e.name)]

  // console.log(arr[0])


  let history = useNavigate();
  const handleRegresar = () => {

    history("/cart")
  }

  // function onChangecard(ev){
  //   console.log(ev.target.value)
  // //   setState({...state,name:e.target.value})
  // // console.log(state.name);

  // }

  //AGREGAMOS LA FUNCION
  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({ //Tieme objetos que debe de completar
      type: "card",  //type de pago: metodo de tarjeta
      card: elements.getElement(CardNumberElement) //Selecciona el input element de la tarjeta
    });
    setLoading(true)
    console.log(paymentMethod);

    if (!error) {
      const { id } = paymentMethod
      try {

        const { data } = await axios.post(`/checkout`, {

          id,
          amount: precioTotal*100,
          mail,
          arr,
          userIdName

        })
        console.log(data);
        swal({title:`You have pay $ ${precioTotal} successfully`})
        
        dispatch(deleteItemFromCart('All'))
        history("/")

      } catch (error) {
        swal({title:error})
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cart))
  }, [cart])

  return (
      <div className="container">

        <div className="divElementsFromCartPayment">
          <div>
          <button onClick={(e) => handleRegresar(e)} className="button-49">{'Continue Shopping'}</button>
          </div>
        <hr></hr>
        <div className="Games-buy-conteiner">
          {items && items.length ? items.map(game => {
            return (
              <CardHover image={game.image} price={game.price} name={game.name}></CardHover>

            )
          }) : <div>no tiene elementos seleccionados</div>}
        </div>
        </div>
        <hr />
        <div className="conteiner-card">
              <h2 className="tituloTarjeta">Card Details</h2>
            <div className="divFormPayment">
                <div className="cardTarjeta">
                {/* <CardElement className="cardElement" /> */}
                <h4> Card Number </h4>
                <CardNumberElement className="CardNumberElement"></CardNumberElement>
                <div className="Date-CVV-conteiner">
                  <div className="details-date-cvv">
                    <h4> Date </h4> 
                    <CardExpiryElement className="CardExpiryElement"></CardExpiryElement>
                  </div>
                  <div className="details-date-cvv">
                    <h4> CVV </h4>
                    <CardCvcElement className="CardCvcElement"></CardCvcElement>
                  </div>
                </div>
              </div>
              <div className="subcontainerPagar">
                <div className="button-pagar">                    
                    <button onClick={(e) => handleSubmit(e)} className="button-19" disabled={loading ? true : false}>
                      {loading ? <p>Cargando</p> : <p>   { `$ ${precioTotal}.00`}</p>}  <p> 'Checkout'   </p>
                    </button>
                </div>
              </div>
            </div>
        </div>
        
        
      </div>
  )

}