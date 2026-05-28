import React from 'react'
import '../Style/Topdata.css'

const Topdata = ({ data = [] }) => {
  const totalProducts = data.length
  const highestprice = data.reduce((max, item) => (item.price > max ? item.price : max), 0)
  const lowestprice = data.reduce((min, item) => (item.price < min ? item.price : min), Infinity)


  return (
    <div>
      <div className='topdataoverall'>
        <h2 className='topdata'>Total Products:<br></br> 🟢 {totalProducts}</h2>
        <h2 className='topdata'>Highest Price:<br></br> 🟢 ${highestprice}</h2>
        <h2 className='topdata'>Lowest Price:<br></br> 🟢 ${lowestprice}</h2>
      </div>
    </div>
  )
}

export default Topdata
