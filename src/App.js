import { Routes, Route, Switch } from 'react-router-dom';
import Header from './component/common/Header';
import Data from './component/sub/Data';
import Gallery from './component/sub/Gallery';
import Location from './component/sub/Location';
import Community from './component/sub/Community';
import Youtube from './component/sub/Youtube';
import Main from './component/main/Main';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

import Buttons from './component/sub/board/common/Buttons';
import Content from './component/sub/board/Content';
import List from './component/sub/board/List';
import Write from './component/sub/board/Write';
import Edit from './component/sub/board/Edit';
import Footer from './component/common/Footer';

import './scss/style.scss';
import './scss/common.scss';
import './scss/board.scss';
import './scss/member.scss';
import './scss/memo.scss';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: types.FLICKR.start,
			opt: { type: 'interest', count: 100 },
		});

		dispatch({
			type: types.YOUTUBE.start,
		});

		dispatch({
			type: types.MEMBER.start,
		});
	}, []);
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Header title={'main'} />
					<Main className='visual-wrap' />
				</Route>
				<Route path='/'>
					<Header title={'sub'} />
				</Route>
			</Switch>

			<Route path='/data' component={Data} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/location' component={Location} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/community' component={Community} />

			<Route path='/board'>
				<Switch>
					<Route exact path='/board' component={List} />
					<Route path='/board/write' component={Write} />
					<Route path='/board/content/:id' component={Content} />
					<Route path='/board/edit/:id' component={Edit} />
				</Switch>
				<Buttons />
			</Route>

			<Footer></Footer>
		</>
	);
}

export default App;
