import React from 'react'
import { Chart as Chartjs,Legend,Title,ArcElement,Tooltip } from 'chart.js'
 import { Pie } from 'react-chartjs-2'
 import chartDataLabels from 'chartjs-plugin-datalabels'
 ChartJS.register(
 
  
  Tooltip,
  Legend,
  Title,
  ArcElement,
   chartDataLabels
)
const data={
     labels: ["Food", "Drinks", "Snacks", "Others"],

    datasets:[{label:"sales",data: [1200, 2000, 1500, 300],
  backgroundColor:["red","teal","yellow","green"],borderRadius:3,}]
}
const options={
    plugins:{
        title:{
            display:true,
            text:"Sales distribution",
            color:"blue",
            font:{
                size:20,
                weight:"bold"
            }
        },
        position:{
            position:"bottom",
            x:0.1,
            y:1
        },
        datalabels:{
            color:"black",
            font:{
                size:15,
                weight:"bold"
            },
          }
          }     

}



const Piechartusingchartjs = () => {
  return (
    <div style={{width:"50%",height:"70%"}}>
        <Pie data={data} options={options}/>
        

      
    </div>
  )
}

export default Piechartusingchartjs
