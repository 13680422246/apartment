import React, { memo, lazy, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import MyHeader from './Header';
import { Route, Switch } from 'react-router-dom';
import { useTitle } from '../../js';

const Login = lazy(() => import('../login'));
const Regiser = lazy(() => import('../register'));
const HomeContent = lazy(() => import('./content'));
const Room = lazy(() => import('./room'));
const userCenter = lazy(() => import('./userCenter'));

const { Header, Content } = Layout;

const Home: React.FC = (props) => {
	useTitle('首页'); // 修改title
	return (
		<Layout
			style={{
				height: '100%',
			}}>
			<Header
				style={{ position: 'fixed', zIndex: 999, width: '100%' }}
				className='text'>
				<MyHeader />
			</Header>
			<Content>
				<Suspense
					fallback={
						<Spin size='large' className='position-center' />
					}>
					<Switch>
						<Route path='/login' component={Login} exact />
						<Route path='/register' component={Regiser} exact />
						<Route path='/room/:id' component={Room} exact />
						<Route
							path='/usercenter'
							component={userCenter}
							exact
						/>
						<Route path='/' component={HomeContent} exact />
					</Switch>
				</Suspense>
			</Content>
		</Layout>
	);
};
export default memo(Home);
