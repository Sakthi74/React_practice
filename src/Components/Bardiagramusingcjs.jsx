import React from 'react'
import { Legend,BarElement,Tooltip,Title,Chart as ChartJS,LinearScale,CategoryScale} from 'chart.js'
import { Bar } from 'react-chartjs-2'

const Bardiagramusingcjs = () => {
  const data={
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets:[{label:"Sales",data: [1200, 2000, 1500, 300,900,800,900,1000,500,700,1000,900],
  backgroundColor:["red","teal","Navyblue","green","lightgreen","lightgray","yellow","purple","pink"],borderRadius:3,}]
    
  }
  ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
)

  return (
    <div style={{width:"100%",height:"300px"}}>
      <Bar data={data}/>
    </div>
  )
}

export default Bardiagramusingcjs
