import React from 'react'
import "../Style/Menuitem.css"

const Menuitemcard = ({ item ,onEdit,edititem,editmode,del,seteditmode }) => {
  console.log(item)
  return (
    <div className="card">
      <img className="item-image" src={item.image} alt={item.name} />
      <h4 className='item-name'>{item.name}</h4>
      <p className='item-price'>${item.price}</p>
      {editmode  && (
  <button
    className="edit-button"
    onClick={onEdit}
  >
    Edit
  </button>
)}

{editmode && (
  <button
    className="delete-button"
    onClick={() => del(item.id)}
  >
    Delete
  </button>
)}
    </div>
  )
}

export default Menuitemcard
