import { useNavigate  } from "react-router-dom";
import './SearchBar.css'
import { useState } from "react";
import lupita from '../../Style/Imagenes/lupa.png'
import { clearVideogames } from '../../redux/Actions/Index'
import { useDispatch } from "react-redux";

export default function SearchBar({ onSearch }) {

    const [name, setName] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate("../home/games");
        dispatch(clearVideogames())
        onSearch(name)
    }



    return (

        <div className="cont-searchbar">
            <form onSubmit={(e) => handleSubmit(e)}>
                <button
                    className="HOME-BTN"
                    type='submit'
                >
                    <img src={lupita} alt="lupa" />
                </button>
                <input
                    className="INPUT-SEARCH"
                    type='text'
                    placeholder="Search..."
                    onChange={(e) => handleInputChange(e)}
                />
            </form>
        </div>

    )
}