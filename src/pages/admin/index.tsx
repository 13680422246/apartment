import React, { memo, lazy, Suspense, useLayoutEffect } from 'react';
import { Layout, Spin, Result, Button } from 'antd';
import { Route, Switch, NavLink } from 'react-router-dom';
import SideBar from './SideBar';
import MyHeader from './Header';
import usePermission from '../../js/hooks/usePermission';
const { Header, Content } = Layout;

const HomeAdmin = lazy(() => import('./HomeAdmin'));
const NotFount = lazy(() => import('../status/404'));

interface IPros {}
const Admin: React.FC<IPros> = (props) => {
	/**
	 * 请求我的权限列表，渲染侧边栏
	 */
	const { run, side, error, loading, index, route } = usePermission();

	/**
	 * 一进来就是加载权限
	 */
	useLayoutEffect(() => {
		run({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) {
		let msg = '发生未知错误，请联系管理员';
		let code: '500' | '404' = '500';
		if (/netword/i.test(error.message)) {
			msg = '网络错误';
			code = '404';
		}
		return (
			<Result
				status={code}
				title={code}
				subTitle={msg}
				extra={
					<Button type='primary'>
						<NavLink to='/'>刷新</NavLink>
					</Button>
				}
			/>
		);
	}
	return (
		<Layout
			style={{
				height: '100vh',
			}}>
			<Header className='text'>
				<MyHeader />
			</Header>
			<Layout
				style={{
					height: '100vh',
				}}>
				<SideBar side={side} loading={loading} index={index} />
				<Content
					style={{
						position: 'relative',
						height: '100%',
						overflow: 'auto',
					}}>
					<Suspense
						fallback={
							<Spin size='large' className='position-center' />
						}>
						<Switch>
							{route}
							<Route path='/admin/' component={HomeAdmin} exact />
							<Route
								path='/admin'
								render={() => <NotFount url='/admin' />}
							/>
						</Switch>
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
};
export default memo(Admin);
