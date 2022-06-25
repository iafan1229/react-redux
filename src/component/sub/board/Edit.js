import React, {useState,useRef,useEffect} from 'react'
import Wrap from './common/Wrap'
import Layout from '../../common/Layout';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function Edit() {
  const boardTime = new Date().toLocaleString();
  const params = useParams()
  const history = useHistory()
  let item = localStorage.getItem('item')
  item = JSON.parse(item)

  /* 인풋에 담기 */
  const [text, setText] = useState({
    title: item[params.id].title,
    comment: item[params.id].comment,
    date: item[params.id].date
  })
  const [show, setShow] = useState(false)
  const [error, setError] = useState({})
  const [data,setData] = useState(item)


  
  const handleChange = (e) => {
    const title = e.target.id
    setText({...text,[title] : e.target.value, date: boardTime})
  }
  const reset = () => {
    setText({title :'',comment: ''})
  }

  /* 리스트 출력 기능 */
  const submit = (e) => {
    const err = {};
    e.preventDefault();
    if(!text.title.trim()) {
      err.title = '글자 입력하세요.'
    }

    if(!text.comment.trim()) {
      err.comment = '글자 입력하세요'
    }
    setError(err)
    setShow(true)
  }
  /* 데이터 담기 */
  useEffect(()=>{
    if(Object.keys(error).length === 0 && show) {
      
      const result = data.map((el,idx)=>{
        if(params.id==idx) el=text
        return el
      })

      setData([...result])
      setText({title :'',comment: ''})
      setOk(true)
    }
  },[error])


  const [ok, setOk] = useState(false)
  useEffect(()=>{
    let saveItem = null;
    try {
      localStorage.setItem('item',JSON.stringify(data))
    }catch(e) {
      console.log('error')
    }finally {
      if(ok) {
        saveItem = localStorage.getItem('item');
        saveItem = JSON.parse(saveItem)
        if(saveItem) history.push('/board')
      }
    }
  },[data,ok])
  return (
    <Layout name="community">
      <Wrap name="write">
        <div className="write-wrap">
            <form action="" className='write'>
              <fieldset>
                <legend>게시판 글 입력란</legend>
                <dl>
                  <dt><label htmlFor="title">제목</label>
                  <input type="text" id="title" value={text.title} onChange={handleChange} />
                  <span>{error.title}</span>
                  </dt>
                  <dd>
                    <label htmlFor="comment">내용</label>
                    <textarea name="" id="comment" cols="30" rows="10" value={text.comment} onChange={handleChange}></textarea>
                    <span>{error.comment}</span>
                  </dd>
                </dl>
              </fieldset>
              {/* <button className="reset" onClick={reset}>초기화</button> */}
              <button className="submit" onClick={submit}>제출</button>
            </form>
          </div>
      </Wrap>
    </Layout>
  )
}

export default Edit