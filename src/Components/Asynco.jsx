import React, {  useEffect, useState } from 'react'
import Empdetails from './Empdetails'
import '../Style/table.css'
import Nav from './Nav'
import Search from './Search'
import Sidebar from './Sidebar'

const Asynco = () => {
  const[userdata,setuserdata]=useState([])
  const[loading,setloading]=useState(true)
  const[search,setsearch]=useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = await fetch("https://dummyjson.com/products") 
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
  const num = filteredUsers.length
  return num
}
    
const filteredUsers = userdata.filter((user) =>
  user.username.toLowerCase().includes(search.toLowerCase())
)
  


  return (
    <>
    <Nav/>
   
    <h1 className='emph1' >Employees</h1>
    <div className='childcomponents'>
       <Sidebar/>  
    <Search search_variable={search} setsearch={setsearch}/>
    {loading ? <p>Loading...</p> : null}
    {/* <input type="text"  className='inp1' placeholder='search'/> */}
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
      
      {!(loading)&& filteredUsers.map((user)=>(<Empdetails key={user.id} id={user.id} name={user.username} email={user.email} address={user.address} useerd={user}/>))
    
    }
    </tbody>
    
   

</table>
</div>
<h3 className='totalnum'>Showing <strong>{number()}</strong> employees</h3>
    
   
    </>
  )
}

export default Asynco
