import { useState } from "react"

function Filter({ setFilterbyCatagory, totaldata, setShowData, filterbyCatagory }) {


    function HandleFilter(e) {

        let filterdData = totaldata.filter((product) => {
            return product.category === e.target.value

        })

        setShowData(filterdData)
    }

    return (
        <>
            <label >Filter :{" "} </label>
            <select value={filterbyCatagory} onChange={prev => {
                setFilterbyCatagory(prev.target.value)
                HandleFilter(prev)
            }}>
                <option >Catagory </option>
                <option value="smartphones">Smartphones</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home-decoration</option>
                <option value="tops">Tops</option>
            </select>
        </>
    )
}

export default Filter