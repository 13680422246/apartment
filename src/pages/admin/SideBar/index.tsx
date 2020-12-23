import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import icons from './routers';
import { NavLink, useLocation } from 'react-router-dom';
import { useRequest } from '../../../utils';

interface ISideItem {
	title: string;
	url: string;
	icon: React.ReactNode;
}

interface IPros {}
const defaultProps = {};
const SideBar: React.FC<IPros> = (props) => {
	const location = useLocation();
	/**
	 * 请求我的权限列表，渲染侧边栏
	 */
	const [side, setSide] = useState<ISideItem[]>([]); // 侧边栏
	const { run } = useRequest<
		{
			id: number;
			parentid: number;
			name: string;
			url: string;
		}[],
		{}
	>('/admin/authority/findTopList', {
		onSuccess: ({ data }) => {
			const side: ISideItem[] = [];
			for (const permission of data) {
				const icon = icons[permission.url];
				if (!!icon) {
					side.push({
						title: permission.name,
						url: permission.url,
						icon,
					});
				}
			}
			setSide(side);
		},
	});
	/**
	 * 监听side、location的改变
	 */
	const [index, setIndex] = useState<[string]>(['']);
	useEffect(() => {
		const { pathname } = location;
		const index = side
			.findIndex((item) => item.url === pathname)
			.toString();
		setIndex([index]);
	}, [side, location]);
	useLayoutEffect(() => {
		run({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Layout.Sider collapsible breakpoint='lg'>
			<Menu theme='dark' mode='inline' selectedKeys={index}>
				{side.map((item, index) => (
					<Menu.Item key={index} icon={item.icon}>
						<NavLink to={item.url}>{item.title}</NavLink>
					</Menu.Item>
				))}
			</Menu>
		</Layout.Sider>
	);
};
SideBar.defaultProps = defaultProps;
export default memo(SideBar);
