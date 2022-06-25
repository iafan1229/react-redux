import React, {useState,useEffect,useRef} from 'react'
import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';


function Gallery() {
  const list = ['hamburger','pizza','sandwich','coffee','cafe','break',"dog", "fish", "bird", "cat", ""]
  const flickr = useSelector((store)=> store.flickrReducer.flickr)
  const dispatch = useDispatch();
  const [opt, setOpt] = useState({type: 'interest', count: 100});
  const [value,setValue]=useState('')
  const [send, setSend] = useState('')
  const [include, setInclude] = useState(false)

  const path = process.env.PUBLIC_URL;
  const [index,setIndex] = useState(0);
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('');
  const pop = useRef(null)
  const val = useRef(null)
  const validate = list.map((name,idx)=>{return name.startsWith(value)});

  const masonryOptions = {
    transitionDuration: '0.5s',
    columnWidth: 20,
  };

  const listup = (e) => {
    const keyword = e.target.innerText;
    setSend(keyword)
  }

  const handleReset = () => {
    setOpt({
      type: 'interest',
      count: 100
    })
  }

  const handleSearch = (e) => {
    const tag = value.trim(); 
    if(!tag) {
      alert('검색어를 입력하세요')
      return false;
    }
    setOpt({
      type: 'search',
      keyword: tag,
      count: 100
    })
    setValue('')
    val.current.focus();
  }
  const handleEnter = (e) => {
    const tag = e.target.value.trim(); 
    if(e.key ==='Enter') {
      if(!tag) {
        alert('검색어를 입력하세요')
        return false;
      }else {
        setOpt({
          type: 'search',
          keyword: e.target.value,
          count: 100
        })
        setValue('')
        val.current.focus();
      }
    }
  }

  const endLoading = () => {
    setTimeout(()=>{
      setLoading(false)
    },1000)
  }

  useEffect(()=>{
    (send!=='') && setValue(send)
  },[send])
  useEffect(()=> {
    dispatch({type: 'FLICKR_START', opt})
    setLoading(true);
    
  },[opt]);
  
  useEffect(()=>{
    setLoading(true)
    val.current.focus();
  },[])


  useEffect(()=>{
    //기존의 endLoading함수를 api요청을 보낼때 실행하는게 아닌
		//store를 통해서 데이터결과값이 새롭게 반환될때 실행
    //이떄 처음 flickr값은 빈 배열이 들어오기 때문에 그때만 조건문으로 실행되지 않도록 처리
    endLoading();
  },[flickr])

  return (
    <>
      <Layout>
        <h2>갤러리 검색</h2>
        <div className="visual-search">
          <div className="search-wrap">
            <input type="text" onChange={(e)=>{
                setValue(e.target.value)
              }} 
              onKeyUp={(e)=>{handleEnter(e)}} 
              value={value} 
              ref={val} />
            <button onClick={()=>{handleReset()}}>Interest</button>
            <button className="search" onClick={(e)=>{handleSearch(e)}}>Search</button>
          </div>
          <ul className="keyword">
            <p>추천 검색어<span>(검색어를 클릭하세요)</span></p>
            <ul className='list'>
              {
              (validate.includes(true)) ? list.map((name,idx)=>{
                  return (name.startsWith(value)) && (
                  <li key={idx} onClick={(e)=>listup(e)}>{name}</li>
                  )
              }) : <p>추천 키워드가 없습니다.</p>
              }
            </ul>
          </ul>
          
        </div>
        <Masonry className="gallery" elementType={'dl'} options={masonryOptions}>
          {(loading) ? <img src={path+"loading.gif"} alt="loading"/> : null}
          {(!loading)&&flickr.map((gallery,index)=>{ 
            return (
              <>
                <dl key={index} className="list">
                    <dd onClick={(e)=>{
                        e.preventDefault()
                        setIndex(index)
                        pop.current.show()
                    }}>
                      <img src={`https://live.staticflickr.com/${gallery.server}/${gallery.id}_${gallery.secret}_m.jpg`} alt={gallery.title} />
                    </dd>
                    <dt>
                      <ul>
                        <li>
                          <dl className="user-list">
                            <dt onClick={()=>{
                              const owner = gallery.owner;
                              setOpt({
                                type: 'user',
                                count: 100,
                                id: owner
                              })
                            }}>
                              <img src={`http://farm${gallery.farm}.staticflickr.com/${gallery.server}/buddyicons/${gallery.owner}.jpg`} alt="" 
                                onError={(e)=>{e.target.src="https://www.flickr.com/images/buddyicon.gif"}}
                                onClick={(e)=>{e.stopPropagation()}}
                              />
                            </dt>
                            <dd>{gallery.owner}</dd>
                          </dl>
                        </li>
                        <li className="title">{gallery.title}</li>
                      </ul>
                    </dt>
                </dl>
              </>
            )
          })}
        </Masonry>
      </Layout>
      <Popup ref={pop}>
            {(flickr.length !== 0) && <>
              <img src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`} alt={flickr[index].title}/>
              <button className="close" onClick={()=>pop.current.unshow()}>닫기</button>
            </>}
      </Popup>
    </>
  )
}

export default Gallery

/*  
keyDown : 키를 누르는 시점
keyUp : 키를 눌렀다 떼는 시점
keyPress : 키룰 눌렀다 떼는 시점 (한영변환 같은 특수키 안 먹음)
*/