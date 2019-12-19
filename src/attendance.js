import React from 'react'

const Attendance = ({ attendance }) => {
    console.log(attendance);
    
  return (
      attendance.map((att, index)=>{
          const {date, status} = att
          console.log(date);
      })
  )
};

export default Attendance