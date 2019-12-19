import React, {Component} from 'react'
import moment from 'moment'

const Contacts = ({ contacts }) => {
  return (
      contacts.map((contact, index) =>{
          const {sid, name, sirname, attdance} = contact
          const fullname = name+"            "+sirname
          const one = attdance[0]
          console.log(attdance);
          
          return(
              <tr key={sid}>
                <td>{sid}</td>
                <td>{name}</td>
                <td>{sirname}</td>
                <td>{attdance.map(function(ta, index){
                return <p>{ta.status} on {moment(ta.date).format('DD-MM-YYYY')}</p>
                })}</td>
              </tr>
          )
      })
  )
};

export default Contacts