import React from 'react'

import {
  Tooltip,
  Legend,
  Title,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  
)

const Lchartusingchartjs = () => {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    datasets: [
      {
        label: "Sales",

        data: [100, 200, 150, 300,900,800,100,1000,1000,1000,1000,1000],

        borderColor: "green",

        backgroundColor: "lightgreen",

        tension: 0
      }
    
     ,
     
        { label: "Profit",

      data: [5, 10, 8, 2000,9000,8003,100,1000,1000,1000,1000,1000],

      borderColor: "blue",

      backgroundColor: "lightblue",

      tension: 0,
      borderwidth: 2
    }]
    

  };

  const options = {

  responsive: true,

  plugins: {

    tooltip: {
      enabled: true
    },

    legend: {
      display: true
    },

    title: {
      display: true,
      text: "Monthly Sales"
    }

  },

  scales: {

    x: {

      grid: {
        color: "gray",
    }
    
},

y: {
    
    grid: {
        color: "lightgray",
        backgroundColor: "lightgray"
      }

    }

  },

  animation: {

    duration: 1000

  }

}

  return (
    <div>

      <div style={{ width: "700px", height: "400px" }}>
        <Line data={data} options={options}  />
      </div>

    </div>
  )
}

export default Lchartusingchartjs