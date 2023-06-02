import { useState } from "react"
import "./TableMap.css"
import { BsCurrencyRupee } from 'react-icons/bs';

//______________________Products Data Map________________________________//

function TableMap({ title, description, thumbnail, price, rating, id }) {

    const [cartquantity, setCartquantity] = useState(1)

    function HandleIncreament(id) {
        if (cartquantity === 5) {
            setCartquantity(cartquantity)
        } else {
            setCartquantity(cartquantity + 1)
        }
    }

    function HandleDecreament(id) {
        if (cartquantity === 1) {
            setCartquantity(cartquantity)
        } else {
            setCartquantity(cartquantity - 1)
        }
    }

    return (
        <>

            <tr >
                <td><img className="image" width='70%' src={thumbnail} /></td>
                <td><h3>{title}</h3></td>
                <td><p className="description">{description}</p></td>
                <td className="rating">{rating}</td>
                <td ><h4 className="price"><BsCurrencyRupee/>{" "}{price}</h4></td>
                <td>
                    <div className="Quantitydiv">
                        <p className="sub" onClick={() => HandleDecreament(id)} >-</p>
                        <p className="quantity">{cartquantity}</p>
                        <p className="add" onClick={() => HandleIncreament(id)}>+</p>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TableMap