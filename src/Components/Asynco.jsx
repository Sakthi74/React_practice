import React, {  useEffect, useState } from 'react'
import Empdetails from './Empdetails'
import '../Style/table.css'
import Nav from './Nav'

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

function number(){
  const num = userdata.length
  return num
}
    
  


  return (
    <>
    <Nav/>
    {loading ? <p>Loading...</p> : null}
    <input type="text"  className='inp1' placeholder='search'/>
    <h1 className='emph1' >Employees</h1>
    <table>
<thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Address</th>
  </tr>
</thead>
    <tbody>
      
      {!(loading)&& userdata.map((user)=>(<Empdetails key={user.id} id={user.id} name={user.username} email={user.email} address={user.address}/>))
    
    }
    </tbody>
    
   

</table>
<h3 className='totalnum'>Showing <strong>{number()}</strong> employees</h3>
    
   
    </>
  )
}

export default Asynco
