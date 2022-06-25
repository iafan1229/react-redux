import React from 'react';
import { useRef, useEffect, useState } from 'react';
import Visual1 from './Visual1';
import Visual2 from './Visual2';
import Visual3 from './Visual3';
import Visual4 from './Visual4';
import Bar from './Bar';
import Anime from '../class/Anime';

function Main() {
	let tmp = [];
	let [arr, setArr] = useState([]);
	const main = useRef(null);

	const getPos = () => {
		const visual = main.current.querySelectorAll('.visual');
		visual.forEach((el, index) => {
			tmp.push(el.offsetTop);
		});
		setArr(tmp);
		tmp = [];
	};

	const parallex = () => {
		const btn = main.current.querySelectorAll('ul.bar li');

		let scroll = window.scrollY;
		const distance = 10;
		arr.forEach((el, idx) => {
			if (scroll >= el - distance) {
				for (let i = 0; i < btn.length; i++) {
					btn[i].classList.remove('on');
				}
				btn[idx].classList.add('on');
			}
		});
	};
	const [index, setIndex] = useState(0);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		return () => {
			window.removeEventListener('resize', getPos);
		};
	}, []);

	useEffect(() => {
		//버튼 클릭시 이동
		new Anime(window, {
			prop: 'scroll',
			value: arr[index],
			duration: 1000,
		});
	}, [arr, index]);

	useEffect(() => {
		//스크롤시 원에 on 붙고, 스크롤 시 이동

		window.addEventListener('scroll', parallex);
		return () => window.removeEventListener('scroll', parallex);
	}, [arr]);
	return (
		<div ref={main}>
			<Visual1 />
			<Visual2 />
			<Visual3 />
			<Visual4 />
			<Bar setIndex={setIndex} />
		</div>
	);
}

export default Main;
