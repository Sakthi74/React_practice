import React from 'react'
import {Title,Legend,Tooltip,ArcElement,Chart as ChartJS} from "Chart.js"
import { Pie } from 'react-chartjs-2'
import SalesData from './Salesdata'
ChartJS.register{
    Tooltip,
      Legend,
      Title,
      ArcElement,
}
const SalesPiechart = ({data}) => {

    const chartdata={
        labels:data.map((item)=>{item.title})
    
    dataset=[{
        label:"Sales report",
        data:data.map((i)=>i.price),
        backgroundcolor:["red",
          "blue",
          "green",
          "orange",
          "purple"]
    }]}

  return (
    <div style={{width:"100px"}}>
        <Pie data={chartData} />
      
    </div>
  )
}

export default SalesPiechart
