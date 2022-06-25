import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';

function Data() {
	const list = [
		'Develop Team',
		'Project Managing',
		'Human Resource',
		'Design Team',
	];
	const members = useSelector((store) => store.memberReducer.members);
	const dispatch = useDispatch();
	const [member, setMember] = useState(null);
	const path = process.env.PUBLIC_URL + '/img/department/';

	const showPerson = (e) => {
		const data = members.filter((el, idx) => {
			return el.type === e.currentTarget.textContent;
		});
		setMember(data);
	};

	useEffect(() => {
		dispatch({ type: 'MEMBER_START' });
	}, []);

	useEffect(() => {
		setMember(members);
	}, [members]);

	return (
		<Layout name={'org'}>
			<h2>부서 조직도</h2>
			<div class='chart'>
				<span class='director'>
					<p>
						<Link to='#'>
							Director
							<br />
							(CEO)
						</Link>
					</p>
				</span>

				<ul class='top-chart'>
					<li class='top1'>
						<Link to='#'>Human Resource</Link>
					</li>
					<li class='top2'>
						<Link to='#'>Management</Link>
					</li>
				</ul>

				<ul class='bottom-chart'>
					<li class='bottom1'>
						<p>
							<Link to='#'>
								Development
								<br /> Team
							</Link>
						</p>
					</li>
					<li class='bottom2'>
						<p>
							<Link to='#'>
								Design <br />
								Group
							</Link>
						</p>
					</li>
					<li class='bottom3'>
						<p>
							<Link to='#'>
								Project
								<br /> Managing
							</Link>
						</p>
					</li>
					<li class='bottom4'>
						<p>
							<Link to='#'>
								Global
								<br /> Department
							</Link>
						</p>
					</li>
				</ul>
			</div>
			<h2 style={{ marginTop: '60px' }}>부서정보 리스트</h2>
			<div className='btn'>
				<button onClick={() => setMember(members)}>Show All</button>
				{list.map((name, idx) => {
					return <button onClick={showPerson}>{name}</button>;
				})}
			</div>

			<div class='data'>
				{member &&
					member.map((el, idx) => {
						return (
							<table>
								<colgroup>
									<col style={{ width: '30%' }} />
									<col />
								</colgroup>
								<tr>
									<td colSpan='2'>
										<img src={path + el.image} alt='' />
									</td>
								</tr>
								<tr>
									<th>부서</th>
									<td>{el.type}</td>
								</tr>
								<tr>
									<th>이름</th>
									<td>{el.name}</td>
								</tr>
								<tr>
									<th>직위</th>
									<td>{el.position}</td>
								</tr>
							</table>
						);
					})}
			</div>
		</Layout>
	);
}

export default Data;
