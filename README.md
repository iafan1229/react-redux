
<img src="https://postfiles.pstatic.net/MjAyMjA1MjhfMTcx/MDAxNjUzNzM1NTQ2NDUy.sBlWd7dzRjAzjKLtoeaJSvrnyUstmXgNJYlYhNsFe1Ig.xPmcz15r10UuuVDSk5UzNUMnaD6wAUFySAtn3nDHfrwg.GIF.home124/GIF_2022-05-28_%EC%98%A4%ED%9B%84_7-50-37.gif?type=w773">
<a href="https://community-hydev.netlify.app" about="_blank">웹 애플리케이션 링크 바로가기</a>

<h1>Community Site</h1>
<ul>
  <li>종합 커뮤니티 포털사이트입니다.</li>
  <li>Flickr API, 카카오맵 API, Youtube API를 사용 / Redux-saga로 전역데이터 비동기처리를 구현하였습니다</li>
</ul>

<h1>프로젝트 구성 안내</h1>

<h1>기술 스택</h1>
<ul>
  <li>Javascript, React, Redux, Redux-saga</li>
</ul>

<h1>주요 기능 설명</h1>

<h2>1. Swiper</h2>
<ul>
  <li>Promise.all로 동영상이 모두 로딩된 후 메인이 나오도록 Loading Bar 처리</li>
  <li>Swiper의 activeIndex를 활용하여 선택된 동영상만 로드되도록 처리</li>
</ul>
<h2>2. 카카오지도 API</h2>
<ul>
  <li>카카오맵 API를 활용하여 맛집 리스트 검색 기능</li>
  <li>버튼 클릭시 해당 장소로 이동하게끔 처리</li>
</ul>
<h2>3. Flickr API </h2>
<ul>
  <li>검색 시에 해당키워드가 자동으로 나오게끔 구현</li>
  <li>추천키워드 기능을 누르면 인풋창에 그 키워드가 입력되게 가능</li>
  <li>검색 버튼 클릭시 출력된 데이터 Redux-Saga로 비동기 처리하여 메인페이지에 출력 되게끔 처리</li>
  <li>클릭 시 forwardRef로 만든 팝업을 call하여 팝업 완성</li>
</ul>
<h2>4. Youtube API </h2>
<ul>
  <li>데이터 Redux-Saga로 비동기 처리하여 메인페이지에 출력 되게끔 처리</li>
  <li>클릭 시 forwardRef로 만든 팝업을 call하여 팝업 완성</li>
</ul>
<h2>5. Memo</h2>
<ul>
  <li>로컬 스토리지로 CRUD 기능 구현</li>
  <li>글 작성시 메모데이터 메인페이지에 출력</li>
</ul>
<h2>6. Board</h2>
<ul>
  <li>로컬 스토리지로 CRUD 기능 구현</li>
  <li>중첩 라우팅</li>
  <li>글 작성시 게시판 메인페이지에 출력</li>
</ul>
