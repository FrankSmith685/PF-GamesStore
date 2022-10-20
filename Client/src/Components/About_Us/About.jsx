import { Link } from "react-router-dom";
import React from "react";
import '../About_Us/About.css'
import lautaro from "../../Style/Imagenes/lautaro.jpeg"
import sergior from "../../Style/Imagenes/Sergio_Romero.jpg"
import juandavid from "../../Style/Imagenes/juandavid.jpeg"
import lucianab from "../../Style/Imagenes/lucianab.jpeg"
import sergiog from "../../Style/Imagenes/sergiog.jpeg"
import pierino from "../../Style/Imagenes/pierino.jpeg"
import frank from "../../Style/Imagenes/frank.jpeg"
import linkedin from "../../Style/Imagenes/linkedin.png"
import instagram from "../../Style/Imagenes/instagram.png"
import github from '../../Style/Imagenes/github.png'

export default function About() {
    return (
        <div className="About-general">
            <h1 className="aboutTitleMembers"> About Us: </h1>
            <div className="divFlexAboutContainer" >
                
                <div className="About">
                        <div className="blob"></div>
                <div className="name">
                    <a className="Link" target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/juan-david-pabon-porras-4123b389/'>
                        <h3>Juan David</h3>
                        <span><img width={200} className='imageProfileAbout' height={200} id="imgl" src={juandavid} alt="juandavid"></img></span>
                    </a>
                    <p>
                        <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/juan-david-pabon-porras-4123b389/'><img src={linkedin} height="35" width="35" ></img></a> 
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/juandapabon84/" ><img src={instagram} height="35" width="35"></img></a>
                        <a target="_blank" rel="noreferrer" href="https://github.com/juandavid84" ><img src={github} height="35" width="35"></img></a>
                    </p>
                </div>
                </div>



                <div className="About">
                        <div className="blob"></div>
                <div className="name">
                    <a className="Link" target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/'>
                        <h3>Frank</h3>
                        <span><img width={200} className='imageProfileAbout' height={200} id="imgl" src={frank} alt="frank"></img></span>
                    </a>
                    <p>
                    <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/frank-smith-bocangelino-rojas-351157168/'><img src={linkedin} height="35" width="35" ></img></a> 
                        <img src={instagram} height="35" width="35"></img>
                        <img src={github} height="35" width="35"></img>
                    </p>
                </div>
                </div>


                
            </div>
            <div>
                <Link to='/home'>
                    <button id="backToHome">Back to Home</button>
                </Link>
            </div>
        </div>
    )
}