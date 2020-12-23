import React, { memo, lazy, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Route, Switch } from 'react-router-dom';
import SideBar from './SideBar';
const { Header, Content } = Layout;

const Role = lazy(() => import('./Role'));
const HomeAdmin = lazy(() => import('./HomeAdmin'));

interface IPros {}
const Admin: React.FC<IPros> = (props) => {
	return (
		<Layout
			style={{
				height: '100%',
			}}>
			<Header className='text'>header</Header>
			<Layout>
				<SideBar />
				<Content>
					<Suspense
						fallback={
							<Spin size='large' className='position-center' />
						}>
						<Switch>
							<Route path='/admin/role' component={Role} exact />
							<Route path='/admin/' component={HomeAdmin} />
						</Switch>
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
};
export default memo(Admin);
