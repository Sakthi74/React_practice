import React from 'react'
import '../Style/search.css'


const Search = ({ search_variable, setsearch }) => {
    function handlechange(e){
        setsearch(e.target.value)
    }
  return (
    <div>
        <h3 className='manageemployees'>Manage Employees</h3>
        <form className='formstyle'>
            <label htmlFor="search">ID <sup>*</sup></label>
            <input type="id"  onChange={handlechange}   placeholder="ID"/>
            <label htmlFor="search">Name <sup>*</sup></label>
            <input type="text"   onChange={handlechange} placeholder="Name" />
            <label htmlFor="search">Email <sup>*</sup></label>
            <input type="email"  onChange={handlechange} placeholder="Email"   />
            <label htmlFor="search">Phone <sup>*</sup></label>
            <input type="text"   onChange={handlechange} placeholder="Phone"   />
            <button className='sbutton' type="submit">Search</button>
             <button className='sbutton2' type="submit">Add Employee & Setup</button>
            
        </form>
      
    </div>
  )
}

export default Search
