import React, { useState } from "react";
import Menucategorysidebar from '../Components/Menucategorysidebar'
import Menuheader from '../Components/Menuheader'
import Menusearchbar from '../Components/Menusearchbar'
import { Menu } from 'lucide-react'
import Menuitemgrid from '../Components/Menuitemgrid'
import EmptyState from '../Components/EmptyState'


const Menumanagement = () => {
  const [editmode, seteditmode] = useState(false)
  const[carddelete,setcarddelete]=useState(false)
  const [activetype, setactivetype] = useState("Bottled Beer")
  const[searchitem,setsearchitem]=useState("")
  return (
    <>
      <div className='menumanagement-header' style={{ display: "flex", flexDirection: "column" }}>
        <div  style={{ display: "flex" }}>
      <Menusearchbar  setsearchitem={setsearchitem} searchitem={searchitem}/>
          <Menuheader   editMode={editmode}
  seteditmode={seteditmode} setcarddelete={setcarddelete}/>
          </div>
      
        <div style={{ display: "flex", gap: "20px" }}>
          <EmptyState/>
      <Menucategorysidebar activetype={activetype} setactivetype={setactivetype} />
     

        <Menuitemgrid edit={editmode} seteditmode={seteditmode} setcarddelete={setcarddelete} activetype={activetype} setactivetype={setactivetype} searchitem={searchitem}/>
        
        
        </div>
        </div>
      
    </>
  )
}

export default Menumanagement
