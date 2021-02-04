import React, { memo, lazy, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import MyHeader from './Header';
import { Route, Switch } from 'react-router-dom';
import { useTitle, classNames } from '../../js';
import style from './index.module.scss';

const Login = lazy(() => import('../login'));
const Regiser = lazy(() => import('../register'));
const HomeContent = lazy(() => import('./content'));
const Room = lazy(() => import('./room'));
// 用户中心
const UpdatePwd = lazy(() => import('./update-pwd'));
const UserInfo = lazy(() => import('./user-info'));
const Subscribe = lazy(() => import('./Subscribe'));

const { Header, Content } = Layout;

const Home: React.FC = (props) => {
	useTitle('首页'); // 修改title
	return (
		<Layout className={classNames.call(style, 'layout')}>
			{/* 头部区域 */}
			<Header className={`${classNames.call(style, 'header')} text`}>
				<MyHeader />
			</Header>
			{/* 内容区域 */}
			<Content className={classNames.call(style, 'content')}>
				<Suspense
					fallback={
						<Spin size='large' className='position-center' />
					}>
					<Switch>
						<Route path='/login' component={Login} exact />
						<Route path='/register' component={Regiser} exact />
						<Route path='/room/:id' component={Room} exact />
						<Route path='/user-info' component={UserInfo} exact />
						<Route path='/update-pwd' component={UpdatePwd} exact />
						<Route path='/Subscribe' component={Subscribe} exact />
						<Route path='/' component={HomeContent} exact />
					</Switch>
				</Suspense>
			</Content>
		</Layout>
	);
};
export default memo(Home);
