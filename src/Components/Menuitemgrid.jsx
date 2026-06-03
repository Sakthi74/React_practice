import React from 'react'
import {menuItems} from "../Data/Menudata"
import Menuitemcard from './Menuitemcard'
import Additempopup from './Additempopup'
import { useState } from 'react'
import "../Style/Menugrid.css"

const Menuitemgrid = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [items, setItems] = useState(menuItems)
  const additem = (newitem) => {
    setItems(prev=>[...prev,newitem])
  }
  console.log(items)
  return (
    <div className='menugrid'>
      {items.map((item) => (
        <Menuitemcard key={item.id} item={item} />
      ))}
      <button className='Addbutton' onClick={() => setShowPopup(true)}>
        ADD ITEM
      </button>
       {showPopup && (
        <Additempopup  addItem={additem}
          closePopup={() => setShowPopup(false)}
        />
      )}
    
    </div>
  ) 
}



export default Menuitemgrid
