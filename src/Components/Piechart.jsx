import React from 'react'
import { Pie,PieChart,ResponsiveContainer,Tooltip,  Cell } from 'recharts'

const Piechart = () => {
    const data = [
  { name: "Cash", value: 400 },
  { name: "Card", value: 300 },
  { name: "UPI", value: 500 }
]
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]
  return (
    <div>
       <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">

  <Pie data={data}
  dataKey="value"
  nameKey="name"
  outerRadius={100}
  label
>

{
  data.map((entry, index) => (
    <Cell
      key={index}
      fill={COLORS[index]}
    />
  ))
}

</Pie>
<Tooltip/>
<PieChart/>
            </ResponsiveContainer>
        </div>

      
    </div>
  )
}

export default Piechart
