import { FaPlusCircle,FaSave  } from 'react-icons/fa';
import { FiLogOut  } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem, getItems } from '../../Slices/ItemSlice';
import { createList, getLists } from '../../Slices/ListSlice';
import { DispatchType, RootState } from '../../Store';
import { CreateItem, Item } from '../../Types/Item';
import { Lists } from '../../Types/Lists';
import { ItemPage } from '../Item/item';
import { ListPage } from '../List/List';
import './listItem.css';
import { logout } from '../../Slices/PersonSlice';

export const ItemListPage:React.FC= ()=>{
    let navigate= useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const ListState = useSelector((state:RootState) => state.list);
    const ItemState = useSelector((state:RootState) => state.item);
    const dispatch:DispatchType = useDispatch();
    const [newList, setNewList] = useState<Lists>({
        name: '',
        description:'',
        person: userState.currentUser//JSON.parse(localStorage.getItem('user')||'{}')
    });
    
    const handleListChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewList({
            ...newList,
            [e.target.name]: e.target.value
        });
    }

    const [newItem, setNewItem] = useState<CreateItem>({
        name: '',
        description:'',
        price:0,
        listId: ListState.listId
    });
    const handleItemChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    }


    const [showList, setShowList]= useState(false);
    const [showItem, setShowItem]= useState(false);

    const addNewList=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        setShowList(false);
        dispatch(createList(newList)).then(()=>{
            dispatch(getLists(userState.currentUser.personId!));
        });
    }
 

    const addNewItem=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
       
        dispatch(createItem(newItem)).then((data)=>{
           dispatch(getItems(ListState.listId));
        });
        setShowItem(false);
    }

    const showItemContainer= ()=>{
       if(showItem) setShowItem(false)
       else setShowItem(true);
    }
    const showListContainer= ()=>{
       if(showList) setShowList(false)
       else setShowList(true);
    }

    const handleLogout = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
      dispatch(logout());
        navigate("/login");
    }

    useEffect(()=>{
       dispatch(getLists(userState.currentUser.personId!));
       dispatch(getItems(ListState.listId));
        setNewItem({
            ...newItem,
            listId: ListState.listId
        });
      
    }, [ItemState.items.length, ListState.lists.length, ListState.listId])

    return (
        <>
         <FiLogOut onClick={handleLogout} className='logout'/>
         <h1 className='ListItemHeader'>Grocery List Tracking</h1>
        <div className= "ListRootContainer">
           
        <div className= "ListLeftContainer">
            <h2> Lists</h2>
 
       {
             ListState.lists.map((list:Lists) => {
                return <ListPage key={list.listId} listId={list.listId} name={list.name}
                description={list.description} createdDate={list.createdDate}             />
            })
       }
                 
            <FaPlusCircle onClick={showListContainer}></FaPlusCircle>
           { showList?
             <div className='ListCreateContainer'>
              
               <input name="name" type="text" placeholder='list name' onChange={handleListChange}></input>
              
               <input name="description" type="text" placeholder='list description' onChange={handleListChange}></input>
               <FaSave onClick={addNewList}></FaSave>
             </div>
             : <></>}
        </div>
        <div className='ListCenterContainer'></div>
        <div className="ListRightContainer">
       <h2>Items</h2>
       <p><strong>Current List Id is: </strong> {ListState.listId}</p>
       {
             ItemState.items.map((item:Item) => {
                return <ItemPage key={item.itemId} itemId={item.itemId} name={item.name}
                description={item.description} price={item.price} list={ListState.lists.find((x: { listId: any; }) => x.listId === ListState.listId)!}             />
            })
       }
       <FaPlusCircle onClick={showItemContainer}></FaPlusCircle>
           { showItem?
             <div className='ListCreateContainer'>
              
               <input name="name" type="text" placeholder='item name' onChange={handleItemChange}></input>
               
               <input name= "description" type="text" placeholder='item description' onChange={handleItemChange}></input>
             
               <input  name= "price" type="number" placeholder='item price' onChange={handleItemChange}></input>
               
               <FaSave onClick={addNewItem} ></FaSave>
             </div>
             : <></>}
        </div>
        </div>
        </>
    )
}