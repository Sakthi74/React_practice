import React from 'react'
import "../Style/Menusearchbar.css"

const Menusearchbar = ({ setsearchitem, searchitem }) => {
  return (
    <> <div className='searchbardiv'>
      <p>
      <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="size-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
  />
</svg></p>

      <h4  className='h4quickorder'>QUICK ORDER</h4>
      <textarea name="Ref#" id=""></textarea>
      <input className='scansearchinput' type="search" placeholder='SCAN OR SEARCH AN ITEM' value={searchitem} onChange={(e) => setsearchitem(e.target.value)}   />
      
      
    </div>
      </>
   
  )
}

export default Menusearchbar
