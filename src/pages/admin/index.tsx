import React, { memo, lazy, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Route, Switch } from 'react-router-dom';
import SideBar from './SideBar';
import MyHeader from './Header';
import { useNotAdminThenGoBack } from '../../store/userRedcer/dispatch';
const { Header, Content } = Layout;

const Role = lazy(() => import('./Role'));
const Permission = lazy(() => import('./Permission'));
const HomeAdmin = lazy(() => import('./HomeAdmin'));
const Chart = lazy(() => import('./Chart'));
const Test = lazy(() => import('./Test'));
const NotFount = lazy(() => import('../status/404'));

interface IPros {}
const Admin: React.FC<IPros> = (props) => {
	/**
	 * 判断用户是否具有权限
	 */
	useNotAdminThenGoBack();
	return (
		<Layout
			style={{
				height: '100%',
			}}>
			<Header className='text'>
				<MyHeader />
			</Header>
			<Layout>
				<SideBar />
				<Content style={{ position: 'relative' }}>
					<Suspense
						fallback={
							<Spin size='large' className='position-center' />
						}>
						<Switch>
							<Route path='/admin/role' component={Role} exact />
							<Route
								path='/admin/permission'
								component={Permission}
								exact
							/>
							<Route
								path='/admin/chart'
								component={Chart}
								exact
							/>
							<Route path='/admin/test' component={Test} exact />
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
