import React from 'react'
import "../Style/Menuheader.css"
import { MdLayers } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import {
  Bell,
  EthernetPort,
  Pencil,
  LockKeyhole
} from "lucide-react";
const Menuheader = () => {
  return (
    <div className='overallmenuheader'>
      <MdLayers size={28} className='layer' />
      <TbArrowBackUp size={28} className='arrow' />
      <Bell className='bell'/>
      <EthernetPort className='port' />
      <Pencil className='pencil' />
      <LockKeyhole />
    </div>
  )
}

export default Menuheader
