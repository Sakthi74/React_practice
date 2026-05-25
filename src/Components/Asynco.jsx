import React, {  useEffect, useState } from 'react'
import Empdetails from './Empdetails'


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
    <>
    <h1>Employee Details</h1>
    {loading ? <p>Loading...</p> : null}
    {!(loading)&&
    
    userdata.map((user)=>(<Empdetails key={user.id} id={user.id} name={user.username} email={user.email} address={user.address}/>))
    
    }
    </>
  )
}

export default Asynco
