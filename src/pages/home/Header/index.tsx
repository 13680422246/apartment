import React, { memo } from 'react';
import { Row, Col, Divider, Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import {
	useUserStore,
	useUserDispatch,
} from '../../../store/userRedcer/dispatch';
import Logo from './Logo';
import Chat from '../Chat';
import { A } from '../../../components';
import { DownOutlined } from '@ant-design/icons';
import { classNames } from '../../../js';
import style from './index.module.scss';

const cls = classNames.bind(style);

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

/**
 * 下拉菜单
 */
const menu = (
	<Menu>
		<Menu.Item>
			<NavLink to='/update-pwd'>修改密码</NavLink>
		</Menu.Item>
		<Menu.Item>
			<NavLink to='/user-info'>完善用户信息</NavLink>
		</Menu.Item>
		<Menu.Item>
			<NavLink to='/subscribe'>我的预约</NavLink>
		</Menu.Item>
		<Menu.Item>
			<NavLink to='/contract'>我的合同</NavLink>
		</Menu.Item>
	</Menu>
);

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
						<Dropdown overlay={menu}>
							<span>
								<A>
									用户中心
									<DownOutlined className={cls('arrow')} />
								</A>
							</span>
						</Dropdown>
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
						<Chat />
					</div>
				)}
			</Col>
		</Row>
	);
};
export default memo(Header);
