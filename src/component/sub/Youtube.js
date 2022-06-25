import { useSelector, useDispatch } from 'react-redux';
import React, {useState,useEffect,useRef} from 'react'
import Layout from '../common/Layout'
import Popup from '../common/Popup';
import styled from "styled-components";

function Youtube() {
    // .then((json)=>{
    //   dispatch(setYoutube(json.data.items))
    // })
    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false)
    const pop = useRef(null)
    const youtubeData = useSelector((store)=> store.youtubeReducer.youtube)
    
    useEffect(()=>{
        dispatch({type: 'YOUTUBE_START'})
    },[])
    return (
        <>
            <Layout name="youtube">
                <h2>Youtube 인기 플레이리스트</h2>
                <div className="list-wrap">
                    {youtubeData.map((youtube,idx)=>{
                        const des = youtube.snippet.description
                        // console.log(youtubeData[0].snippet.description.length>20)
                        return (
                            <div className="list" onClick={()=>{
                                setIndex(idx)
                                setLoading(true)
                                pop.current.show()
                                }}>
                                <div><img src={youtube.snippet.thumbnails.medium.url} alt="" /></div>
                                <Scroll ul className='scroll-bar'>
                                    <li><h2>{idx+1}</h2></li>
                                    <li><h2>{youtube.snippet.title}</h2></li>
                                    <li className="date"><span>{youtube.snippet.publishedAt.split("T")[0]}</span></li>
                                    <li><pre>{(des.length>200) ? des.substr(0,200) : des}</pre></li>
                                    <li className="tags">
                                        
                                        {(youtube.snippet.tags) ? (
                                            <ul>
                                                {(youtube.snippet.tags)?.map(el=> <li>{'#'+el.substr(0, 50)}</li>)}
                                            </ul>
                                        ) : null}
                                    </li>
                                </Scroll>
                            </div>
                        )
                    })}
                </div>
            </Layout>
            <Popup ref={pop}>
                {loading&&(
                    <>
                        <iframe src={`https://www.youtube.com/embed/${youtubeData[index].id}`} frameBorder="0" allowFullScreen />
                        <button onClick={()=>pop.current.unshow()}>CLOSE</button>
                    </>
                )}
            </Popup>
        </>
    )
}

export default Youtube
const Scroll = styled.nav`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;