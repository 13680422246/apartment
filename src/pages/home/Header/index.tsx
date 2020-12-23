import React, { memo } from 'react';
import { Row, Col, Divider } from 'antd';
import { NavLink } from 'react-router-dom';
import {
	useUserStore,
	useUserDispatch,
} from '../../../store/userRedcer/dispatch';
import Logo from './Logo';

interface Ipros {}

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
	const store = useUserStore();
	const dispatch = useUserDispatch();
	/**
	 * 注销登录
	 */
	const logout = () => {
		dispatch.logout();
	};
	return (
		<Row justify='space-between'>
			<Col>
				<NavLink to='' className='text'>
					<Logo title='公寓管理系统' icon='logo' />
				</NavLink>
			</Col>
			<Col>
				{store.token === '' ? (
					<div>
						<NavLink to='/login'>登录</NavLink>
						<MyDivider />
						<NavLink to='/register'>注册</NavLink>
					</div>
				) : (
					<div>
						<span>{store.username}</span>
						<MyDivider />
						<NavLink to='/usercenter'>用户中心</NavLink>
						<MyDivider />
						<NavLink
							to=''
							onClick={(e) => {
								e.preventDefault(); // 阻止默认事件
								logout();
							}}>
							注销登录
						</NavLink>
						<MyDivider />
						<NavLink to=''>联系客服</NavLink>
					</div>
				)}
			</Col>
		</Row>
	);
};
export default memo(Header);
