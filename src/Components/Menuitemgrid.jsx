import React from 'react'
import {menuItems} from "../Data/Menudata"
import Menuitemcard from './Menuitemcard'
import Additempopup from './Additempopup'
import { useState,useEffect } from 'react'
import "../Style/Menugrid.css"

const Menuitemgrid = ({ edit,setactivetype,activetype, searchitem }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [items, setItems] = useState(() => {
  const storedItems =
    localStorage.getItem("menuItems");

  return storedItems
    ? JSON.parse(storedItems)
    : menuItems;
})
  const [edititem, setedititem] = useState(false)
  const[selecteditem,setselecteditem]=useState(null)
  
  const additem = (newitem ) => {
    setItems(prev=>[...prev,newitem])
  }
  console.log(items)
console.log(edit)
  const handleedit = (item) => {
    setedititem(true)
    setselecteditem(item)
    setShowPopup(true)
  }

  const handleupdate = (updateditem) => { 
    setItems(prev => prev.map(item => item.id === updateditem.id ? updateditem:item))
  }

  const handledelete = (id) => {
    setItems(prev=>[...prev.filter(item=>item.id !==id)])
  }

  useEffect(() => { 
    console.log("Saving to localStorage", items); localStorage.setItem('menuItems', JSON.stringify(items))
  }, [items])
  
  const filteredItems = items.filter(item => item.category === activetype && item.name.toLowerCase().includes((debouncedSearch || "").toLowerCase()))

  useEffect(() => {
    if (searchitem === undefined) return setDebouncedSearch("")
    const timer = setTimeout(() => {
      setDebouncedSearch(searchitem);
    }, 300);
    return () => {
    clearTimeout(timer);
  };
  }, [searchitem]);

  return (
    <div className='menugrid'>
      {filteredItems.map((item) => (
    <Menuitemcard
  key={item.id}
  item={item}
  onEdit={() => handleedit(item)}
  editmode={edit}
  del={handledelete}
/>
      ))}
      <button className='Addbutton' onClick={() => setShowPopup(true)}>
        ADD ITEM
      </button>
       {showPopup && (
        <Additempopup  addItem={additem}
          closePopup={() => setShowPopup(false)}
          editItem={edititem}
          selecteditem={selecteditem}  updateItem={handleupdate}
        />
      )}
    
    </div>
  ) 
}



export default Menuitemgrid
