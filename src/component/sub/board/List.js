import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrap from './common/Wrap';
import Layout from '../../common/Layout';

function List() {
	const dummydata = [
		{
			title: '테스트1제목',
			comment: '테스트1내용',
			date: '임시날짜',
		},
	];
	const getData = () => {
		let item = localStorage.getItem('item');
		if (item) {
			return JSON.parse(item);
		} else {
			return dummydata;
		}
	};
	const [data, setData] = useState(getData);
	useEffect(() => {
		localStorage.setItem('item', JSON.stringify(data));
		console.log(data);
	}, [data]);

	return (
		<Layout name='community'>
			<Wrap name='table-wrap'>
				<p className='table-title'>총 {data.length}개의 글이 있습니다</p>
				<table className='table'>
					<colgroup>
						<col style={{ width: '10%' }} />
						<col style={{ width: '70%' }} />
						<col style={{ width: '20%' }} />
					</colgroup>
					<tbody>
						<tr>
							<th>번호</th>
							<th>제목</th>
							<th>날짜</th>
						</tr>

						{data.map((_, idx) => {
							return (
								<>
									<tr>
										<td>{idx + 1}</td>
										<td>
											<Link to={`/board/content/${idx}`}>
												{data[idx].title}
											</Link>{' '}
										</td>
										<td>{data[idx].date}</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			</Wrap>
		</Layout>
	);
}

export default List;
