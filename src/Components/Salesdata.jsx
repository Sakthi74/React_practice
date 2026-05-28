import React, { useEffect,useState} from 'react'
import Productgraph from './Productgraph'
import Topdata from './Topdata'
import Salespiechart from "./SalesPiechart"
const SalesData = () => {
    const [salesdata,setSalesdata]=useState([])
  
    useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products')
      const jas = await res.json()
      console.log(jas)
      setSalesdata(jas.products || [])
    } catch (err) {
      console.error(err)
    }
  }
  fetchData()
}, [])
console.log(salesdata.title)
  return (
    <div>
      <Topdata data={salesdata} />
    <Productgraph data={salesdata} />
    <Salespiechart data={salesdata}/>
    </div>
  )
}

export default SalesData
