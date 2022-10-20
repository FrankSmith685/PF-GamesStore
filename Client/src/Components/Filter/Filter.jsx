import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterGames, filterGamesByTags } from '../../redux/Actions/Index'
import './Filter.css'



export default function Filter({ genres, platforms, tags, setCurrentPage, handleSort }) {

    let dispatch = useDispatch()

    let Tagsinfilter = useSelector(state => state.Tagsinfilter)

    function handleFilter() {
        let platformby = document.getElementById('platforms').value
        let genreby = document.getElementById('genres').value
        dispatch(filterGames({ platformby, genreby }))
        setCurrentPage(1)
    }

    const tagsCheckboxes = document.querySelectorAll('input[type="checkbox"]')

    function handleCheck(e) {
        let tagstofilter = []
        tagsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                tagstofilter.push(checkbox.value)
            }
        })
        dispatch(filterGamesByTags(tagstofilter))
    }

    function handleRefresh(event) {
        event.preventDefault()
        window.location.reload()
    }

    return (
        <div className='Filter-box'>
            <h4>Select a Platform:</h4>
            <select id='platforms' defaultValue={'all'} onChange={(e) => handleFilter(e)} className='filterSelectStyle'>
                <option value='all' >All</option>
                {
                    platforms.map(plat => {
                        return (
                            <option
                                key={plat.id}
                                value={plat.name}
                            >{plat.name}</option>
                        )
                    })
                }
            </select>
            <h4> Select a Genre:</h4>
            <select id='genres' defaultValue={'all'} className='filterSelectStyle' onChange={(e) => handleFilter(e)}>
                <option value='all'> All </option>
                {
                    genres.map(plat => {
                        return (
                            <option
                                key={plat.id}
                                value={plat.name}
                            >{plat.name}</option>
                        )
                    })
                }
            </select>

            <div className='Sorts'>
                <h4 color='#ffffff'> Sort By: </h4>
                <select className='SELECT-ORDER' id='orderBy' onChange={(e) => handleSort(e)} defaultValue='orderBy'>
                    <option value='name'> Name </option>
                    <option value='rating'> Rate </option>
                </select>
                <h4>In What Order ? </h4>
                <select className='SELECT-ORDER' id='orderType' onChange={(e) => handleSort(e)} defaultValue='orderType'>
                    <option value='asc'> Ascendent </option>
                    <option value='des'> Descendent </option>
                </select>
            </div>

            <div className='details-tags-button'>
                <details close className='DETAILS-TAGS' open>
                    <summary className='SUMMARY-TAGS'> Tags: </summary>

                    {tags.map(el => el.name)?.map((tags, index) => {
                        return (
                            <label className='LABEL-TAGS' key={index} ><br></br><input
                                className='pruebainputsummary'
                                key={tags}
                                type='checkbox'
                                name='tags'
                                value={tags}
                                onClick={e => handleCheck(e)}
                            ></input>{tags}</label>
                        )
                    })}

                </details >
                <ul className='listtags'>
                    {
                        Tagsinfilter.map(el => {
                            return <li className='taglist'>{el}</li>
                        })
                    }
                </ul>
                <div id='conteiner_button_filters'>
                    <button id='button_filters' onClick={handleFilter}> Search Tags </button>
                    <button id='button_filters' onClick={(event) => handleRefresh(event)}> Clear filters </button>
                </div>
            </div>

        </div>
    )
}