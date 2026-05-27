import React from 'react'
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

const Linechart = () => {

  const data = [
    { month: "Jan", revenue: 400},
    

  { month: "Feb", revenue: 700 },
    { month: "Mar", revenue: 300 },
    { month: "Apr", revenue: 900 },
     { month: "may", revenue: 600 },
     { month: "june", revenue: 800 },
     { month: "july", revenue: 500 },
  
  ]

  return (

    <div style={{ width: "100%", height: "300px" }}>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip

            contentStyle={{
              backgroundColor: "yellow",
              borderRadius: "1px",
              border: "dotted",
              padding: "4px 90px",
               
    
            }}

            labelStyle={{
              color: "black",
              fontWeight: "bold"
            }}

            itemStyle={{
              color: "#38bdf8"
            }}

            cursor={{
              stroke: "red",
              strokeWidth: 1
            }}

          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="green"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default Linechart