import { useDispatch, useSelector } from "react-redux"
import {  getItems, removeItem } from "../../Slices/ItemSlice"
import { DispatchType, RootState } from "../../Store"
import { Item } from "../../Types/Item"
import { CiCircleRemove  } from 'react-icons/ci';

import './item.css'

export const ItemPage:React.FC<Item> =({itemId, name, description,price }) => {
    const ListState = useSelector((state:RootState) => state.list);
    const dispatch:DispatchType= useDispatch();

    const handleRemove= ()=>{
    dispatch(removeItem(itemId!)).then(()=>{
        dispatch(getItems(ListState.listId));
    });
    }

    return(
        <>
        <div className="ItemContainerRoot">
        <p><strong>Name:</strong> {name}</p>
        <p> <strong>Desc:</strong>: {description}</p>
        <p><strong>Price:</strong>: { price}</p>
        <CiCircleRemove onClick={handleRemove}></CiCircleRemove>


        </div>

        </>
    )
}