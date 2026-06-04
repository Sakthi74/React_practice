import { React, useState } from 'react'
import "../Style/Menuheader.css"
import { MdLayers } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import {
  Bell,
  EthernetPort,
  Pencil,
  LockKeyhole
} from "lucide-react";
const Menuheader = ({ editMode, seteditmode,setcarddelete }) => {
  
  const [openadditem,setopenadditem]=useState(false)
  return (
    <div className='overallmenuheader'>
      <MdLayers size={28} className='layer' />
      <TbArrowBackUp size={28} className='arrow' />
      <Bell className='bell'/>
      <EthernetPort className='port' />
      <Pencil className='pencil' onClick={() => seteditmode(prev => !prev)} />
      <LockKeyhole />
    </div>
  )
}

export default Menuheader
