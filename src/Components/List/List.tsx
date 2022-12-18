import { useDispatch } from "react-redux";
import { getItems } from "../../Slices/ItemSlice";
import { currentListId } from "../../Slices/ListSlice";
import { DispatchType } from "../../Store";
import { Lists } from "../../Types/Lists";
import './list.css';

export const ListPage:React.FC<Lists> =({listId, name, description,createdDate }) => {

    const dispatch:DispatchType = useDispatch();

 const getAllItems= (e: { preventDefault: () => void; })=>{
     e.preventDefault();
     console.log("list id inside list.tsx is "+listId);
     dispatch(currentListId(listId!))
        dispatch(getItems(listId!));
   
     
 }

    return(
        <>
        <div className="ListContainerRoot" onClick={getAllItems}>
        <p> <strong>ID:</strong> {listId}</p>
        <p> <strong>Name:</strong> {name}</p>
        <p> <strong>Desc:</strong> {description}</p>
        <p> <strong>Date:</strong> { new Date(createdDate!).toUTCString()}</p>
        </div>

        </>
    )
}