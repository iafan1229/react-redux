import React, {useRef,useEffect,useState} from 'react'
import Layout from '../common/Layout'


function Community() {
  let items = localStorage.getItem('posts')
  items = JSON.parse(items)

  const [text, setText] = useState({
    title: '',
    comment: ''
  })
  const [show, setShow] = useState(false)
  const [error, setError] = useState({})
  const [data,setData] = useState(items)
  const [allowed, setAllowed] = useState(true)

  const editInput = useRef(null)
  const editText = useRef(null)
  let enableUpdate = false;

  /* 리스트 출력 기능 */
  const submit = (e) => {
    const err = {};
    e.preventDefault();
    if(text.title.length < 5) {
      err.title = '5글자 이상 입력하세요.'
    }

    if(text.comment.length < 5) {
      err.comment = '5글자 이상 입력하세요'
    }
    setError(err)
    setShow(true)
  }
  useEffect(()=>{
    if(Object.keys(error).length === 0 && show) {
        setData([text,...data])
        setText({title :'',comment: ''})
    }
  },[error])

  const handleChange = (e) => {
    const title = e.target.id
    setText({...text,[title] : e.target.value})
  }
  const reset = () => {
      setText({title :'',comment: ''})
  }
  const handleDelete = (idx) => {
      const value = data.filter((_,dataIndex)=> dataIndex !== idx )
      setData(value)
  }
  const handleEdit = (idx) => {
    setAllowed(false)
    setData(
      data.map((el,dataIndex)=>{
        if(dataIndex === idx) {
          el.enableUpdate = true;
        }
        return el
      })
    )
  }
  /* 수정 기능 */
  const reset2 = () => {
    editInput.current.value=''
    editText.current.value=''
  }
  const submit2 = (idx) => {
    setAllowed(true)
    if(!editInput.current.value.trim() || !editText.current.value.trim()) {
      alert('수정할 제목과 본문 입력하세요.')
      return;
    }
    setData(
      data.map((el,dataIndex)=>{
        if(idx === dataIndex) {
          el.title= editInput.current.value;
          el.comment = editText.current.value;
          el.enableUpdate = false
        }
        return el
      })
    )
  }


  useEffect(()=>{
    console.log(data)
    localStorage.setItem('posts',JSON.stringify(data))
  },[data])
  return (
    <Layout name='memo'>
        <div className='community'>
          <div className="card">
            <form action="" className='card-form'>
              <fieldset>
                <legend>투두리스트</legend>
                <dl>
                  <dt className='card-wrap'><label htmlFor="title">제목</label>
                  <input type="text" id="title" value={text.title} onChange={handleChange} />
                  <span>{error.title}</span>
                  </dt>
                  <dd className='card-wrap'>
                    <label htmlFor="comment">내용</label>
                    <textarea name="" id="comment" cols="30" rows="10" value={text.comment} onChange={handleChange}></textarea>
                    <span>{error.comment}</span>
                  </dd>
                </dl>
              </fieldset>
              <div className="btn-set">
                <input type="reset" onClick={reset}/>
                <input type="submit" onClick={submit}/>
              </div>
            </form>
          </div>
          <div className="showBox">
            {data.map((el,idx)=>{
                  return (
                    (el.enableUpdate) ? (
                      <>
                        <dl className='editList'>
                          <dt><label htmlFor="title">제목</label>
                          <input type="text" id="title" defaultValue={el.title} ref={editInput}/>
                          <span>{error.title}</span>
                          </dt>
                          <dd>
                            <label htmlFor="comment">내용</label>
                            <textarea name="" id="comment" cols="30" rows="10" defaultValue={el.comment} ref={editText}></textarea>
                            <span>{error.comment}</span>
                          </dd>
                          <dd>
                            <input type="reset" onClick={reset2}/>
                            <input type="submit" onClick={()=>submit2(idx)}/>
                          </dd>
                        </dl>
                        
                      </>
                    )
                    :
                    (
                      <>
                        <div className="list" key={idx}>
                          <span className="title">{data[idx].title}</span>
                          <span className="comment">{data[idx].comment}</span>
                          <div className='btn-set'>
                            <button className="edit" onClick={()=>(allowed) && handleEdit(idx)}>수정</button>
                            <button className="delete" onClick={()=>handleDelete(idx)}>삭제</button>
                          </div>
                        </div>
                      </>
                    )
                    
                  )
              })}
          </div>
        </div>
    </Layout>
  )
}

export default Community
