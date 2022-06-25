import React, { useEffect, useRef } from 'react';

function Layout({ name, children }) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section ref={frame} className={`container ${name}`}>
			<div className='inner'>{children}</div>
		</section>
	);
}
export default Layout;
