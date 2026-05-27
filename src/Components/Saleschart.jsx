import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const Saleschart = () => {
    const data = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 700 },
  { month: "Mar", sales: 300 },
  { month: "Apr", sales: 900 }
]
  return (
   <>
   <div style={{ width: "100%", height: "300px", }}>
  
    <ResponsiveContainer >
    <BarChart data={data}>
        <XAxis dataKey="month"/>
            <YAxis/>
            <Bar dataKey="sales" fill='green' radius={[10,10,9,4]}  barSize={100} animationDuration={3000 } label ={{position:"top"}} background stackId="a" fillOpacity={0.5} stroke="black"
strokeWidth={2}/>

    </BarChart>


    </ResponsiveContainer>
    </div>
   
   </>
  )
}

export default Saleschart
