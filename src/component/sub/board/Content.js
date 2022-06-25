import React, { useState, useEffect } from 'react';
import Wrap from './common/Wrap';
import Layout from '../../common/Layout';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Content() {
	const params = useParams();

	const getData = () => {
		const local = localStorage.getItem('item');
		if (local) {
			return JSON.parse(local);
		} else {
			alert('error');
		}
	};

	const [data] = useState(getData);

	return (
		<Layout name={'boardList on'}>
			<Wrap name='community'>
				<div className='content-wrap'>
					<table className='content-table'>
						<colgroup>
							<col style={{ width: '30%' }} />
							<col style={{ width: '70%' }} />
						</colgroup>
						<tbody>
							<tr>
								<th>제목</th>
								<td>{data[params.id].title}</td>
							</tr>
							<tr>
								<th>작성 내용</th>
								<td>{data[params.id].comment}</td>
							</tr>
						</tbody>
					</table>
					<div className='btn-wrap'>
						<ul>
							<li>
								<Link
									to={
										params.id <= 0
											? `/board/content/0`
											: `/board/content/${params.id - 1}`
									}>
									<button>이전</button>
								</Link>
							</li>
							<li>
								<Link
									to={
										params.id >= data.length - 1
											? `/board/content/${data.length - 1}`
											: `/board/content/${Number(params.id) + 1}`
									}>
									<button>다음</button>
								</Link>
							</li>
						</ul>
						<ul>
							<li>
								<Link to={`/board/edit/${params.id}`}>
									<button>수정</button>
								</Link>
							</li>
							<li>
								<Link to='/board'>
									<button
										className='delete'
										onClick={() => {
											const result = data.filter((el, idx) => {
												return params.id != idx;
											});
											localStorage.setItem('item', JSON.stringify(result));
										}}>
										삭제
									</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</Wrap>
		</Layout>
	);
}

export default Content;
