import React from "react";
import instagram from "../../Style/Imagenes/instagram.png"
import github from '../../Style/Imagenes/github.png'
import facebook from '../../Style/Imagenes/facebook.png'
import pinterest from '../../Style/Imagenes/pinterest.png'
import Suscribe from '../Suscribe/Suscribe'
import { useNavigate } from "react-router-dom";

import '../Footer/Footer.css'

export default function Footer({userLogged}) {

    const navigate = useNavigate();

    function handleAbout(){
        navigate("/about")
        window.scrollTo({ behavior: "smooth", top: "0px" })
    }

    return (
        < footer className="footer" >
            <div className="flexDiv">
                <span className="spanFooterStyle">
                    <span>
                        <h3>Created by:</h3>
                        <ul className="ul_members">
                            
                            <li>
                                <a className="linkTo" href="https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/" target="_blank" rel="noreferrer" >Frank Smith Bocangelino Rojas</a>
                            </li>

                            <li>
                                <a className="linkTo" href="https://www.linkedin.com/in/juan-david-pabon-porras-4123b389/" target="_blank" rel="noreferrer" >Juan David Pabon</a>
                            </li>
                        </ul>
                        <hr></hr>
                    </span>
                    <span className="spanSuscribe">
                    <Suscribe userLogged={userLogged}></Suscribe>
                    </span>
                    <span>
                        <h3>Press And Media</h3>
                        <a target="_blank" rel="noreferrer"  href="https://www.facebook.com/"><img src={facebook} height="35" width="35" alt="facebook"></img></a>
                        <a target="_blank" rel="noreferrer"  href="https://www.instagram.com/"><img src={instagram} height="35" width="35" alt="instagram"></img></a>
                        <a target="_blank" rel="noreferrer"  href="https://www.github.com/"><img src={github} height="35" width="35" alt="github"></img></a>
                        <a target="_blank" rel="noreferrer"  href="https://www.pinterest.com/"><img src={pinterest} height="35" width="35" alt="pinterest"></img></a>
                    </span>
                    
                        
                 
                </span>
                <span className="whatIsGameS">
                    <h3>Wanna know more about us . . . ?</h3>
                    <div id="about_button">
                                    <button onClick={(event)=>handleAbout(event)} id="about">OUR TEAM</button>
                    </div>
                </span>
                <span>
                    <h3>Henry's grupal proyect:  </h3>
                    <p>
                        Hi! We are a group of students in Henry's bootcamp. Through these months we start this path in IT world and we love it! We are proud of our improvement and we are conscious that we have to keep studying after this, to get better and better, cause that is our goal.
                        Please, be free to explore our page and give your opinion about it. We were more than pleased to read your commentaries to improve.
                    </p>
                </span>
                    

            </div>

            
        </footer >

    )
}