import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

const Home = lazy(() => import('../pages/home'));
const Admin = lazy(() => import('../pages/admin'));

const Router: React.FC = () => {
	return (
		<HashRouter>
			<Switch>
				<Route path='/admin'>
					<Suspense
						fallback={
							<Spin size='large' className='position-center' />
						}>
						<Admin />
					</Suspense>
				</Route>
				<Route path='/'>
					<Suspense
						fallback={
							<Spin size='large' className='position-center' />
						}>
						<Home />
					</Suspense>
				</Route>
			</Switch>
		</HashRouter>
	);
};

export default Router;
