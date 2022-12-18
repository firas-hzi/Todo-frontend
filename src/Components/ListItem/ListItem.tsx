import { FaPlusCircle,FaSave  } from 'react-icons/fa';
import { FiLogOut  } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createItem, getItems } from '../../Slices/ItemSlice';
import { createList, getLists } from '../../Slices/ListSlice';
import { DispatchType, RootState } from '../../Store';
import { Item } from '../../Types/Item';
import { Lists } from '../../Types/Lists';
import { ItemPage } from '../Item/item';
import { ListPage } from '../List/List';
import './listItem.css';

export const ItemListPage:React.FC= ()=>{
    
    const userState = useSelector((state:RootState) => state.auth);
    const ListState = useSelector((state:RootState) => state.list);
    const ItemState = useSelector((state:RootState) => state.item);
    const dispatch:DispatchType = useDispatch();
    const [newList, setNewList] = useState<Lists>({
        name: '',
        description:'',
        person: userState.currentUser
    });
    const handleListChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewList({
            ...newList,
            [e.target.name]: e.target.value
        });
    }

    const [newItem, setNewItem] = useState<Item>({
        name: '',
        description:'',
        price:0,
        list: ListState.lists.find(x => x.listId === ListState.listId)!
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
        setShowItem(false);
        console.log(" dfdddsadasdasdd "+ListState.listId);
        setNewItem({
            ...newItem,
            list: ListState.lists.find(x => x.listId === ListState.listId)!
        });
        if(newItem.list)
        {
        dispatch(createItem(newItem)).then((data)=>{
           dispatch(getItems(ListState.listId));
        });
        
    }else console.log("new item . list "+newItem.list);
    }

    const showItemContainer= ()=>{
       if(showItem) setShowItem(false)
       else setShowItem(true);
    }
    const showListContainer= ()=>{
       if(showList) setShowList(false)
       else setShowList(true);
    }

    useEffect(()=>{
        dispatch(getLists(userState.currentUser.personId!));
        dispatch(getItems(ListState.listId));
      
    }, [ItemState.items.length, ListState.lists.length])

    return (
        <>
         <Link className="LinkLogout" to="/login"><FiLogOut className='logout'/></Link>
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
                description={item.description} price={item.price} list={ListState.lists.find(x => x.listId === ListState.listId)!}             />
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