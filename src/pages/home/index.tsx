import React, { memo, lazy, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import style from './index.module.scss';
import MyHeader from './Header';
import { Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('../login'));
const Regiser = lazy(() => import('../register'));
const HomeContent = lazy(() => import('./content'));
const Room = lazy(() => import('./room'));

const { Header, Content } = Layout;

const Home: React.FC = (props) => {
	return (
		<Layout className={style.layout}>
			<Header className='text'>
				<MyHeader title='单身公寓' />
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
						<Route path='/' component={HomeContent} exact />
					</Switch>
				</Suspense>
			</Content>
		</Layout>
	);
};
export default memo(Home);
