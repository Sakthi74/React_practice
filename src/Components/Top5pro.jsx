import React, { useEffect,useState} from 'react'
import "../Style/Top5pro.css"

const Top5pro = () => {
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

const top5 = [...salesdata].sort((a, b) => b.price - a.price).slice(0, 5)

  return (
   <div className='top5'>
        <h3>Top 5 Products by Price</h3>
        <ol>
          {top5.map((p) => (
            <li key={p.id} className='top5name'>
             🟢  {p.title} — ${p.price}
            </li>
          ))}
          {top5.length === 0 && <li>No products available</li>}
        </ol>
      </div>
    
  )
}

export default Top5pro
