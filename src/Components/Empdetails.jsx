import React from 'react'

const Empdetails = ({ id, name, email, address }) => {
  return (
          
<>
<table>
<thead>
    <td>ID</td>
    <td>Name</td>
    <td>Email</td>
    <td>Address</td>
    </thead>
    
    <tbody>
        <tr><p> {id}</p>



</tr>
        <tr><p> {name}</p>  </tr>
        <tr><p> {email}</p></tr>
        
        <tr>{address.street}, {address.suite}, {address.city}, {address.zipcode}</tr>
    </tbody>

</table>

</>
  )
}

export default Empdetails
