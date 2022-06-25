import React, {useState, useRef} from 'react'
import { useSelector } from 'react-redux';
import Popup from '../common/Popup';
import Common from '../common/Common';
import { useEffect } from 'react';

function Visual2() {
  const flickr = useSelector((store)=> store.flickrReducer.flickr)
  const members = useSelector((store)=> store.memberReducer.members)
  const path = process.env.PUBLIC_URL+'/img/department/'

  const pop = useRef(null)
  const [loading, setLoading] = useState(false)
  const [index,setIndex] = useState(0);

  return (
    <>
      <Common name={'vis2'}>
        <h2>Top 5 Gallery List</h2>
        <ul className="gallery">
          {flickr.map((gallery,idx)=> {
            return (idx<5)&&<li onClick={()=>{
                setIndex(idx)
                setLoading(true)
                pop.current.show()
              }}
              >
                <img src={`https://live.staticflickr.com/${gallery.server}/${gallery.id}_${gallery.secret}_m.jpg`} alt={gallery.title} />
              </li>
          })}
        </ul>
        <h2>Member's photo <span>(Manager'position)</span></h2>
        <ul class="member">
          {members.map((el,idx)=>{
            return (
              (el.position==="Manager")&&(
                <>
                  <li>
                    <img src={path+el.image} alt=""/>
                    <p>{el.type}팀</p>
                    </li>
                  </>
                )
              )
          })}
        </ul>
      </Common>
      <Popup ref={pop}>
      {(loading)&&(
        <>
          <img src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`} alt={flickr[index].title}/>
          <button onClick={()=>pop.current.unshow()}>닫기</button>
        </>
      )}
      </Popup>
    </>
  )
}


export default Visual2