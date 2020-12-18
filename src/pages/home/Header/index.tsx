import React, { memo } from 'react';
import { Row, Col, Divider } from 'antd';
import { NavLink } from 'react-router-dom';

interface Ipros {
	title: string;
}

function MyDivider() {
	return (
		<Divider
			type='vertical'
			style={{
				backgroundColor: 'white',
			}}
		/>
	);
}

const Header: React.FC<Ipros> = (props) => {
	return (
		<Row justify='space-between'>
			<Col>
				<NavLink to='' className='text'>
					{props.title}
				</NavLink>
			</Col>
			<Col>
				<div>
					<NavLink to='/login'>登录</NavLink>
					<MyDivider />
					<NavLink to='/register'>注册</NavLink>
				</div>
			</Col>
		</Row>
	);
};
export default memo(Header);
