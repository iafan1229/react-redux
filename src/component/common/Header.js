import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

function Header({ title }) {
	const location = useLocation();
	const style = { color: '#8e84e7' };
	const path = process.env.PUBLIC_URL;
	const menu = useRef(null);
	const [toggle, setToggle] = useState(false);
	const bar = useRef(null);
	const [header, setHeader] = useState('main');
	const [gnb, setGnb] = useState(`url(${path}/img/menu.png)`);

	useEffect(() => {
		if (toggle) {
			menu.current.style.right = '0';
		} else {
			menu.current.style.right = '-100%';
		}
	}, [toggle]);

	useEffect(() => {
		if (location.pathname !== '/') {
			toggle
				? setGnb(`url(${path}/img/close2.png)`)
				: setGnb(`url(${path}/img/menu2.png)`);
		}
		if (location.pathname === '/') {
			toggle
				? setGnb(`url(${path}/img/close.png)`)
				: setGnb(`url(${path}/img/menu.png)`);
		}
		// console.log(header);
	}, [toggle, location]);

	useEffect(() => {
		menu.current.style.right = '-100%';
		setToggle(false);
	}, [location]);

	const initHeight = () => {
		const height = window.scrollY;
		if (height > 500) {
			setToggle(false);
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', () => {
			initHeight();
		});
		return () => window.removeEventListener('scroll', initHeight);
	}, []);

	return (
		<header className={title}>
			<h1>
				<NavLink exact to='/' activeStyle={style}>
					Main
				</NavLink>
			</h1>
			<ul className='gnb'>
				<li>
					<NavLink to='/data' activeStyle={style}>
						Member
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeStyle={style}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/location' activeStyle={style}>
						Location
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeStyle={style}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeStyle={style}>
						Memo
					</NavLink>
				</li>
				<li>
					<NavLink to='/board' activeStyle={style}>
						Board
					</NavLink>
				</li>
			</ul>

			<div className='gnb-mobile'>
				<p
					onClick={() => {
						setToggle(!toggle);
					}}
					className='gnb-bar'
					style={{ backgroundImage: gnb }}></p>
				<aside ref={menu}>
					<ul>
						<li>
							<Link to='/data' activeStyle={style}>
								Member
							</Link>
						</li>
						<li>
							<Link to='/gallery' activeStyle={style}>
								Gallery
							</Link>
						</li>
						<li>
							<Link to='/location' activeStyle={style}>
								Location
							</Link>
						</li>
						<li>
							<Link to='/youtube' activeStyle={style}>
								Youtube
							</Link>
						</li>
						<li>
							<Link to='/community' activeStyle={style}>
								Memo
							</Link>
						</li>
						<li>
							<Link to='/board' activeStyle={style}>
								Board
							</Link>
						</li>
					</ul>
				</aside>
			</div>
		</header>
	);
}

export default Header;
