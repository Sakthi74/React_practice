import React from 'react'
import '../Style/table.css'

const Empdetails = ({ id, name, email, address, useerd }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        {address.street}, {address.suite},
        {address.city}, {address.zipcode}
      </td>
    </tr>
  )
}

export default Empdetails