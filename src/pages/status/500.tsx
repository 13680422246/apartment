import React from 'react';
import { Result, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useTitle } from '../../js';

const NotFount: React.FC<{
	url: string;
}> = (props) => {
	useTitle('500');
	return (
		<Result
			status='500'
			title='500'
			subTitle='服务器错误.'
			extra={
				<Button type='primary'>
					<NavLink to={props.url}>返回到首页</NavLink>
				</Button>
			}
		/>
	);
};
NotFount.defaultProps = {
	url: '/',
};
export default NotFount;
