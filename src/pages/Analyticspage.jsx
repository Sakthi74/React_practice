import React from 'react'
import Sidebar from '../Components/Sidebar'
import SalesData from "../Components/Salesdata"
import Nav from '../Components/Nav'
import Productgraph from '../Components/Productgraph'
import"../Style/Analyticspage.css"
import Top5pro from '../Components/Top5pro'
const Analyticspage = () => {
  return (
    <div>
      <Nav/>
      <div className='graphandsidebar'>
   
      <Sidebar/>
     <SalesData/>
     <Top5pro/>
     </div>

      </div>
    
  )
}

export default Analyticspage
