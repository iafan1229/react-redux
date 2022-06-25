import React from 'react'
import {Link} from 'react-router-dom';

function Buttons() {
  return (
    <ul className='gnb-board'>
        <li><Link to='/board'>목록으로 돌아가기</Link></li>
        <li><Link to='/board/write'>글쓰기</Link></li>
    </ul>
  )
}

export default Buttons