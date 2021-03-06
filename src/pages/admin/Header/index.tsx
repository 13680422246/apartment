import React, { memo, useEffect, useState } from 'react';
import { Row, Col, Button, Space, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import {
	useUserStore,
	useUserDispatch,
	useNotAdminThenGoBack,
} from '../../../store/userRedcer/dispatch';
import { useRequest } from '../../../js';
import { LoginOutlined } from '@ant-design/icons';

interface IPros {}
const defaultProps = {};
const Header: React.FC<IPros> = (props) => {
	const store = useUserStore();
	const dispatch = useUserDispatch();
	const [rolename, setRoleName] = useState('');
	const { loading, run } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			roleid: string;
		}
	>('/admin/role/findMyRoleName', {
		onSuccess: ({ data }) => {
			setRoleName(data.msg);
		},
	});
	useEffect(() => {
		run({
			roleid: store.roleid,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * 判断用户是否具有权限
	 */
	useNotAdminThenGoBack();
	return (
		<Row justify='space-between'>
			<Col>
				<NavLink to='/admin' className='text'>
					公寓管理系统
				</NavLink>
			</Col>
			<Col>
				<Space size='large'>
					<Spin spinning={loading}>
						<span>
							{rolename === '' ? '角色名称' : rolename}:{' '}
							{store.username}
						</span>
					</Spin>
					<Button
						onClick={() => {
							dispatch.logout();
						}}
						shape='circle'
						icon={<LoginOutlined />}></Button>
				</Space>
			</Col>
		</Row>
	);
};
Header.defaultProps = defaultProps;
export default memo(Header);
