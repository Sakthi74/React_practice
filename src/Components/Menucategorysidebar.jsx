import React from 'react'
import "../Style/Menusidebar.css"
import { useState } from 'react'

const Menucategorysidebar = ({ activetype, setactivetype }) => {
 
  return (
      <div>
          <ul className='menucategorysidebarul'>
        <li className={`menucategoryli1 ${activetype === "Bottled Beer" ? "active" : "menucategoryli1"}`} onClick={() => setactivetype("Bottled Beer")}>Bottled Beer</li>
            <li className={`menucategoryli2 ${activetype === "Sandwich" ? "active" : "menucategoryli2"}`} onClick={() => setactivetype("Sandwich")}>Sandwich</li>
            <li className={`menucategoryli3 ${activetype === "Soup salad" ? "active" : "menucategoryli3"}`} onClick={() => setactivetype("Soup salad")}>Soup salad</li>
            <li className={`menucategoryli4 ${activetype === "Wraps" ? "active" : "menucategoryli4"}`} onClick={() => setactivetype("Wraps")}>Wraps</li>
            <li className={`menucategoryli5 ${activetype === "Openitem" ? "active" : "menucategoryli5"}`} onClick={() => setactivetype("Openitem")}>Openitem</li>
            <li className={`menucategoryli6 ${activetype === "Appetizers" ? "active" : "menucategoryli6"}`} onClick={() => setactivetype("Appetizers")}>Appetizers</li>
        <li className={`menucategoryli7 ${activetype === "Dinner" ? "active" : "menucategoryli7"}`} onClick={() => setactivetype("Dinner")}>Dinner</li>
            <li className={`menucategoryli8 ${activetype === "Breakfast" ? "active" : "menucategoryli8"}`} onClick={() => setactivetype("Breakfast")}>Breakfast</li>   
          </ul>
      
    </div>
  )
}

export default Menucategorysidebar
