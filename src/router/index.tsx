import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

const Home = lazy(() => import('../pages/home'));

const Router: React.FC = () => {
	return (
		<HashRouter>
			<Switch>
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
