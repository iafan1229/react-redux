import React, {useState,useEffect} from 'react'
import Layout from '../common/Layout'

function Form() {
  const [text, setText] = useState({
    id:'',
    comment:''
  })
  const [err,setErr] = useState({})
  const [checked,setChecked] = useState(false)
  const [radio, setRadio] = useState(false)
  const [select,setSelect] = useState(false)
  const [success,setSuccess]=useState(false)
  const [result, setResult] = useState(false)
  const favArr = ['수영','골프','기타','독서','음악']
  const gender = ['여성','남성']
  const degree = ['학력 선택','중학교 졸업','고등학교 졸업','대졸','석사 이상']
  const check = (e) => {
    e.preventDefault()
    const errObject={}
    const reg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    if(text.id.length<5) {
      errObject.id = '아이디는 5글자 이상 입력하세요'
    }
    if(text.comment.length<10) {
      errObject.comment = '코멘트는 10글자 이상'
    } 
    if(!reg.test(text.password) || !text.password) {
      errObject.password = '영문, 숫자, 특수문자 혼합하여 8~20자리 이내 비밀번호 입력 바랍니다'
    }
    if(!text.password2 || text.password !== text.password2) {
      errObject.password2 = '비밀번호를 같게 입력하세요'
    }
    if(!checked) {
      errObject.checkbox = '관심사를 하나 이상 선택하세요'
    }
    if(!radio) {
      errObject.radio = '성별을 선택하세요'
    }
    if(!select) {
      errObject.degree = '학력을 선택하세요'
    }
    setErr(errObject)
    setResult(true)
    return err
  }
  useEffect(()=>{
    (Object.keys(err).length===0 && result) ? setSuccess(true) : setSuccess(false)
  },[err])
  return (
    <Layout>
      {success&&<h2>회원가입이 되셨습니당</h2>}
      <form onSubmit={check}>
        <fieldset>
          <legend>입력 양식</legend>
          <table>
            <tr>
              <td>
                <label htmlFor="userId">아이디</label>
                <input type="text" name="id" id="userId" value={text.id} onChange={(e)=>{
                  const {name,value} = e.target;
                  setText({...text,[name]: value})
                }}/>
                <span>{err.id}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" onChange={(e)=>{
                  const {name,value} = e.target;
                  setText({...text,[name]:value})
                }}/>
                <span>{err.password}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">비밀번호 확인</label>
                <input type="password" name="password2" id="password2" onChange={(e)=>{
                  const {name,value} = e.target;
                  setText({...text,[name]:value})
                }}/>
                <span>{err.password2}</span>
              </td>
            </tr>
            <tr>
              <td>
                {favArr.map((el,index)=>{
                  return <label htmlFor={"fav"+index}><input type="checkbox" id={"fav"+index} name="fav" onChange={(e)=>{
                    const checked = e.target.checked;
                    (checked) ? setChecked(true) : setChecked(false)
                  }} />{el}</label>
                })}
                <span>{err.checkbox}</span>
              </td>
            </tr>
            <tr>
              <td>
                {gender.map((el,index)=>{
                  return <label htmlFor={"gender"+index}><input type="radio" name="gender" id={"gender"+index} onChange={(e)=>{
                    const {checked} = e.target;
                    (checked) ? setRadio(true) : setRadio(false)
                  }}/>{el}</label>
                })}
                <span>{err.radio}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="comment">코멘트</label>
                <textarea name="comment" id="comment" cols="30" rows="10" value={text.comment} onChange={(e)=>{
                  const {name,value} = e.target;
                  setText({...text,[name]:value})
                }}></textarea>
                <span>{err.comment}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="edu">학력 선택</label>
                <select name="edu" id="edu" onChange={(e)=>{
                  const value = e.target.options.selectedIndex;
                  (value===0) ? setSelect(false) : setSelect(true)
                }
                }>
                  {degree.map((el,index)=>{
                    return <option value={index}>{el}</option>
                  })}
                </select>
                <span>{err.degree}</span>
              </td>
            </tr>
          </table>
          <input type="submit" value="전송"/>
        </fieldset>
      </form>
    </Layout>
  )
}

export default Form