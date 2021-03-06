import React, { memo } from 'react';
import { Layout, Menu, Skeleton } from 'antd';
import { NavLink } from 'react-router-dom';
import { ISideItem } from '../../../js';

interface IPros {
	side: ISideItem[];
	loading: boolean;
	index: [string];
}
const defaultProps = {};
const SideBar: React.FC<IPros> = (props) => {
	return (
		<Layout.Sider collapsible breakpoint='lg'>
			{props.loading ? (
				<Skeleton
					loading={true}
					active
					paragraph={{
						rows: 20,
					}}
				/>
			) : (
				<Menu theme='dark' mode='inline' selectedKeys={props.index}>
					{props.side.map((item, index) => (
						<Menu.Item key={index} icon={item.icon}>
							<NavLink to={item.url}>{item.title}</NavLink>
						</Menu.Item>
					))}
				</Menu>
			)}
		</Layout.Sider>
	);
};
SideBar.defaultProps = defaultProps;
export default memo(SideBar);
