import React,{useRef,useEffect,useState} from 'react'
import Layout from '../common/Layout';

function Location() {
    const mapContainer = useRef(null);
    const placesList = useRef(null);
    const page = useRef(null);
    const {kakao} = window; //리액트에서 선언하지 않은 변수는 못 쓰니까(ESLint 기능) 윈도우에 kakao 담겨있지만 변수 선언을 해주어야 한다.
    const [render,setRender] = useState(null);
    const [traffic, setTraffic] = useState(false);
    const path = process.env.PUBLIC_URL;
    const [index,setIndex] = useState(null);
    let markers = [];
    const [word,setWord] = useState("이태원 맛집")
    const [place, setPlace] = useState("이태원 맛집")
    const input = useRef(null)

    const positions = [
        {
            title: '인천차이나타운', 
            latlng: new kakao.maps.LatLng(37.47545222269596, 126.61779809042052),
            offset : {offset: new kakao.maps.Point(-40,70)}
        },
        {
            title: '맥도날드 동인천점', 
            latlng: new kakao.maps.LatLng(37.4746247, 126.630497),
            offset : {offset: new kakao.maps.Point(35,55)}
        }
    ];
    
    useEffect(()=>{
        
        mapContainer.current.innerHTML=''
        const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  

        // 지도를 생성합니다    
        const map = new kakao.maps.Map(mapContainer.current, mapOption); 
        // // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places();  
        // // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({zIndex:1});
        // 키워드로 장소를 검색합니다
        searchPlaces();

        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces() {
            const keyword = place;

            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
            }
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword, placesSearchCB); 
            setRender(map)
        }



        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);

                // 페이지 번호를 표출합니다
                displayPagination(pagination);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                alert('검색 결과가 존재하지 않습니다.');
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {

                alert('검색 결과 중 오류가 발생했습니다.');
                return;

            }
        }
        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {

            const listEl = placesList.current,
            //menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(), 
            bounds = new kakao.maps.LatLngBounds(), 
            listStr = '';
            
            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();
            
            for ( let i=0; i<places.length; i++ ) {

                // 마커를 생성하고 지도에 표시합니다
                const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i), 
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function(marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function() {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function() {
                        infowindow.close();
                    });

                    itemEl.onmouseover =  function () {
                        displayInfowindow(marker, title);
                    };

                    itemEl.onmouseout =  function () {
                        infowindow.close();
                    };
                })(marker, places[i].place_name);

                fragment.appendChild(itemEl);
            }

            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl.appendChild(fragment);
            //menuEl.scrollTop = 0;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {

            let el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                        '<div class="info">' +
                        '   <h5>' + places.place_name + '</h5>';

            if (places.road_address_name) {
                itemStr += '    <span>' + places.road_address_name + '</span>' +
                            '   <span class="jibun gray">' +  places.address_name  + '</span>';
            } else {
                itemStr += '    <span>' +  places.address_name  + '</span>'; 
            }
                        
            itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                        '</div>';           

            el.innerHTML = itemStr;
            el.className = 'item';

            return el;
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                    marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage 
                });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( let i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
        }

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            let paginationEl = page.current,
                fragment = document.createDocumentFragment(),
                i; 

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild (paginationEl.lastChild);
            }

            for (i=1; i<=pagination.last; i++) {
                let el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;

                if (i===pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function(i) {
                        return function() {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {   
            while (el.hasChildNodes()) {
                el.removeChild (el.lastChild);
            }
        }

    },[place])

    useEffect(()=>{
        if(index !== null) {
            mapContainer.current.innerHTML=''
            const options = { 
                center: positions[index].latlng,
                level: 3
            };
            const map = new kakao.maps.Map(mapContainer.current, options);

            
            //---------------------------------------
            const imageSrc = path+'marker/marker2.png'; 
            const imageOption = positions[index].offset;
            const imageSize = new kakao.maps.Size(60, 60) 
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

            new kakao.maps.Marker({
                    map: map, 
                    position: positions[index].latlng, 
                    title : positions[index].title, 
                    image : markerImage 
            });   
            setRender(map)

            function setCenter() {            
                const moveLatLon = positions[index].latlng;
                map.setCenter(moveLatLon);
            }
            window.addEventListener("resize", setCenter);

            const mapTypeControl = new kakao.maps.MapTypeControl();
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
            const zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


            return ()=>{window.removeEventListener("resize",setCenter);}
        }

        
    },[index])

    //유즈이펙트를 나눠놔서 두번째 유즈이펙트가 처음에는 ''를 만나게 되고 참조오류가 생긴다. 그러므로 map이 잇다는것을 보증하기 위해 if문으로 분기처리
    useEffect(()=>{
       if(render) {
        (traffic) ? render.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : render.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
       }
    },[traffic])

    
  return (
    <Layout>
        <h2>지도 검색</h2>
        <div className="map-wrap">
            <div id="map" ref={mapContainer}></div>
            
            <div id="menu_wrap" class="bg_white">
                <div class="option">
                    <div>
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            setPlace(word)
                            input.current.focus()
                        }}>
                            키워드 : <input type="text" value={word} id="keyword" size="15" onChange={(e)=>setWord(e.target.value)} ref={input}/> 
                            <button type="submit">검색하기</button> 
                        </form>
                    </div>
                </div>
                <hr/>
                <ul id="placesList" ref={placesList}></ul>
                <div id="pagination" ref={page}></div>
            </div>
        </div>
        <p>검색목록에 마우스를 오버하면 해당 장소명이 표시됩니다.</p>
        <div className="btn">
            {/* 교통정보 표시버튼 */}
            <button onClick={()=>{setTraffic(!traffic)}}>{(traffic) ? '교통정보 표시하기' : '교통정보 표시하지 않기'}</button>
            {/* 지도 이동버튼 */}
            {positions.map((el,idx)=>{
                return <button key={idx} onClick={()=>{
                    setIndex(idx)
                    setWord('')
                    input.current.focus()
                }}>{el.title}</button>
            })}
        </div>
    </Layout>

  )
}

export default Location