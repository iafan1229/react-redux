import axios from "axios";

export const fetchFlickr = async (opt) => {
    const api = '301ea42f4325cf4e5f9475c9249267e8'
    const page = 50;
    const interest = 'flickr.interestingness.getList'
    const search = 'flickr.photos.search'
    const user = 'flickr.people.getPublicPhotos'

    let url = '';

    if(opt.type==='interest'){
        url = `https://www.flickr.com/services/rest/?method=${interest}&api_key=${api}&format=json&nojsoncallback=1&per_page=${page}`
    }

    if(opt.type==='search'){
      url = `https://www.flickr.com/services/rest/?method=${search}&api_key=${api}&format=json&nojsoncallback=1&per_page=${page}&tags=${opt.keyword}`
    }

    if(opt.type==='user') {
      url = `https://www.flickr.com/services/rest/?method=${user}&api_key=${api}&format=json&nojsoncallback=1&per_page=${page}&user_id=${opt.id}`
    }
    
    //axios로 반환받은 데이터만 내보내는 순수함수 코드로 변경
    return await axios.get(url);
}

export const fetchYoutube = async () => {
  const url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=25&key=AIzaSyDFrnhplhM5Fs0IKhtfuJMy2wSlbo9ynt4';
  
  return await axios.get(url);
}

export const fetchMember = async(opt) => {
  const path = process.env.PUBLIC_URL;
  const url = `${path}/DB/data.json`;

  return await axios.get(url)
}