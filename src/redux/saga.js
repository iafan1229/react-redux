import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import {fetchFlickr, fetchYoutube, fetchMember} from './api';
import * as types from './actionType';
/*
  takeLatest : 컴포넌트로부터 데이터변경 요청이 여러번 들어올때 제일 최근 요청 하나만 받는게 (takeEvery: 들어오는 요청을 모두 처리)
  all : 여러개의 함수를 모두 동기적으로 호출
  fork : 여려개의 함수를 비동적으로 호출
  call : 첫번째 인수로 들어온 함수를 호출할때 두번째 인수로 받은 옵션을 적용해서 호출
  put : 리듀서에 데이터 변경 요청 (dispatch와 동일)
*/

//action타입에 따라 실행될 generate 함수

export function* returnFlickr(action) {
    const response = yield call(fetchFlickr, action.opt)
    yield put({type: 'FLICKR_SUCCESS', payload: response.data.photos.photo})
}

export function* callFlickr() {
    yield takeLatest(types.FLICKR.start, returnFlickr);
}

export function* returnYoutube(action) {
    const response = yield call(fetchYoutube, action.opt)
    yield put({type: 'YOUTUBE_SUCCESS', payload: response.data.items})
}

export function* callYoutube() {
    yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

export function* returnMember(action) {
    const response = yield call(fetchMember, action.opt)
    yield put({type: 'MEMBER_SUCCESS', payload: response.data.items})
}

export function* callMember() {
    yield takeLatest(types.MEMBER.start, returnMember);
}

export default function* rootsaga() {
    yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
}