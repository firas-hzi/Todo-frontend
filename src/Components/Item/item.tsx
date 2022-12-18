import { useDispatch } from "react-redux"
import { removeItem } from "../../Slices/ItemSlice"
import { DispatchType } from "../../Store"
import { Item } from "../../Types/Item"
import './item.css'

export const ItemPage:React.FC<Item> =({itemId, name, description,price }) => {

    const dispatch:DispatchType= useDispatch();

    const handleRemove= ()=>{
    dispatch(removeItem(itemId!));
    }

    return(
        <>
        <div className="ItemContainerRoot">
        <p>Name: {name}</p>
        <p> Description: {description}</p>
        <p>Price: { price}</p>
        <button onClick={handleRemove}>Remove</button>


        </div>

        </>
    )
}