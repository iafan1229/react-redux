import React from 'react'

function Bar({setIndex}) {
  return (
    <ul className='bar'>
      <li className='btn on' onClick={()=> setIndex(0)}></li>
      <li className='btn' onClick={()=> setIndex(1)}></li>
      <li className='btn' onClick={()=> setIndex(2)}></li>
      <li className='btn' onClick={()=> setIndex(3)}></li>
    </ul>
  )
}

export default Bar