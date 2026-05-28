import React from 'react'
import { ResponsiveContainer,XAxis,YAxis,Line,LineChart,Tooltip,CartesianGrid ,ReferenceArea} from 'recharts'


const Productgraph = ({ data}) => {
     if (!data || data.length === 0) {
    return <h1>Loading...</h1>
  }
     
  return (
    <div style={{width:"95%",height:"500px"}}>
        <ResponsiveContainer width="100%" height="100%">
<LineChart data={data}>
     <CartesianGrid stroke="#ddd" strokesolidarray="3 3" vertical={false} fill='white   '/>
       <ReferenceArea
    y1={0}
    y2={500}
    fill="#f5f5f5"
  />

  <ReferenceArea
    y1={1000}
    y2={1500}
    fill="#f5f5f5"
  />
<XAxis dataKey="title"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="price" type="monotone"
            
            stroke="green"
            strokeWidth={3} />
    </LineChart>



        </ResponsiveContainer>
     
     
    </div>
  )
}

export default Productgraph
