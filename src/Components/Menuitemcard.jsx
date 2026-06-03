import React from 'react'
import "../Style/Menuitem.css"

const Menuitemcard = ({ item }) => {
  console.log(item)
  return (
    <div className="card">
      <img className="item-image" src={item.image} alt={item.name} />
      <h4 className='item-name'>{item.name}</h4>
      <p className='item-price'>${item.price}</p>
      

    </div>
  )
}

export default Menuitemcard
