import React from 'react'
import Menucategorysidebar from '../Components/Menucategorysidebar'
import Menuheader from '../Components/Menuheader'
import Menusearchbar from '../Components/Menusearchbar'
import { Menu } from 'lucide-react'
import Menuitemgrid from '../Components/Menuitemgrid'
import EmptyState from '../Components/EmptyState'

const Menumanagement = () => {
  return (
    <>
      <div className='menumanagement-header' style={{ display: "flex", flexDirection: "column" }}>
        <div  style={{ display: "flex" }}>
      <Menusearchbar />
          <Menuheader />
          </div>
      
        <div style={{ display: "flex", gap: "20px" }}>
          <EmptyState/>
      <Menucategorysidebar />
     

        <Menuitemgrid/>
        
        
        </div>
        </div>
      
    </>
  )
}

export default Menumanagement
