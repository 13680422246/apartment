import { useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useRequest } from '..';
import routers from '../../config/routers';
import { perfix } from '../../config';

export interface ISideItem {
	title: string;
	url: string;
	icon: React.ReactNode;
}

/**
 * 组件描述: 请求我的权限列表
 * 作者: 苏柏良
 * 时间: 2021-01-17
 */
function usePermission() {
	const location = useLocation();
	/**
	 * 应该渲染的侧边栏
	 */
	const [side, setSide] = useState<ISideItem[]>([]);

	/**
	 * 渲染的<Route />
	 */
	const [route, setRoute] = useState<React.ReactNode[]>();

	/**
	 * 激活哪个sidebar
	 */
	const [index, setIndex] = useState<[string]>(['']); // 元组类型

	/**
	 * 请求的构建
	 */
	const { run, loading, error } = useRequest<
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
			const components: React.ReactNode[] = [];
			for (const permission of data) {
                const url = permission.url.slice(perfix.length);
				const temp = routers[url];
				if (temp === undefined) continue; // 这里temp可能是undefined，但是编辑器没有提示，奇怪
				if (!!temp.icon) {
					side.push({
						title: permission.name,
						url: url,
						icon: temp.icon,
					});
				}
				if (!!temp.component) {
					components.push(
						<Route
							key={url}
							path={url}
							component={temp.component}
							exact
						/>
					);
				}
			}
			setSide(side);
			setRoute(components);
		},
		onError: () => {},
	});

	/**
	 * 监听side、location的改变
	 * 改变index(激活的sidebar)
	 */
	useEffect(() => {
		const { pathname } = location;
		const index = side
			.findIndex((item) => item.url === pathname)
			.toString();
		// 激活sidebar
		setIndex([index]);
	}, [side, location]);

	return {
		side, // 侧边栏选项
		index, // 激活哪个侧边栏
		run, // 请求我的权限
		loading, // 是否正在加载
		error, // 错误
		route, // 渲染的路由组件
	};
}
export default usePermission;
