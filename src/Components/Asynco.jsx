import React, {  useEffect, useState } from 'react'


const Asynco = () => {
  const[userdata,setuserdata]=useState([])
  const[loading,setloading]=useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = await fetch("https://jsonplaceholder.typicode.com/users") 
        const jas = await data.json()
        console.log(jas)
        setuserdata(jas)
        setloading(false)
      } catch(err) {
        console.log(err)
        setloading(false)
      } finally {
        console.log("data is fetched")
      }
    }
    fetchData()
  }, [])


    
  


  return (
    <div>
      {loading ? <h1>data is loading</h1> : <h1>no data found</h1>}
      {!loading && userdata.map((item) => (
        <table key={item.id} border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  )
}

export default Asynco
