import React, {useState,useEffect } from 'react'
import Common from '../common/Common'

function Section() {

  const getData = () => {
    const dummyText = [
      {title: '타이틀 입력1', comment: '내용 입력1'},
      {title: '타이틀 입력2', comment: '내용 입력2'},
      {title: '타이틀 입력3', comment: '내용 입력3'},
      {title: '타이틀 입력4', comment: '내용 입력4'},
      {title: '타이틀 입력5', comment: '내용 입력5'},
    ]
    let local = localStorage.getItem('posts')

    if(local) return JSON.parse(local);
    else return dummyText
  }

  const getBoard = () => {
    const dummyText = [
      {title: '타이틀 입력1', comment: '내용 입력1'},
      {title: '타이틀 입력2', comment: '내용 입력2'},
      {title: '타이틀 입력3', comment: '내용 입력3'},
      {title: '타이틀 입력4', comment: '내용 입력4'},
      {title: '타이틀 입력5', comment: '내용 입력5'},
    ]
    let board = localStorage.getItem('item')

    if(board) return JSON.parse(board);
    else return dummyText
  }
  const [save,setSave] = useState(getData)
  const [board, setBoard] = useState(getBoard)
  const boardTmp =  JSON.parse(JSON.stringify(board));

  localStorage.setItem('posts',JSON.stringify(save))
  localStorage.setItem('item',JSON.stringify(board))

  return (
    <Common name={'vis3 memo-wrap'}>
        <div className='cont1'>
          <h2>최신 메모(3개)</h2>
          {
            save.map((_,idx)=>{
              return (
              <>
                {
                  (idx<3)&&
                  <div className='memo'>
                    <p className='title'>{save[idx].title}</p>
                    <p className='comment'>{save[idx].comment}</p>
                  </div>
                }
              </>
              )
            })
          }
        </div>
        <div className='cont2'>
          <h2>최신 게시글(5개)</h2>
          {
            boardTmp.reverse().map((_,idx)=>{
              return (
              <>
                {
                  (idx<5)&&
                  <div className='memo'>
                    <p className='title'>{boardTmp[idx].title}</p>
                    <p className='comment'>{boardTmp[idx].comment}</p>
                    <p className='date'>{boardTmp[idx].date}</p>
                  </div>
                }
              </>
              )
            })
          }
        </div>
      </Common> 
  )
}

export default Section