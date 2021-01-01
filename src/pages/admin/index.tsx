import React, { memo, lazy, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Route, Switch } from 'react-router-dom';
import SideBar from './SideBar';
import MyHeader from './Header';
const { Header, Content } = Layout;

const Role = lazy(() => import('./Role'));
const Permission = lazy(() => import('./Permission'));
const HomeAdmin = lazy(() => import('./HomeAdmin'));
const Chart = lazy(() => import('./Chart'));
const Chat = lazy(() => import('./Chat'));
const Test = lazy(() => import('./Test'));
const Room = lazy(() => import('./Room'));
const NotFount = lazy(() => import('../status/404'));

interface IPros {}
const Admin: React.FC<IPros> = (props) => {
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
				<SideBar />
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
							<Route path='/admin/room' component={Room} exact />
							<Route path='/admin/chat' component={Chat} exact />
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
