import React, { memo } from 'react';
import { useTitle } from '../../../js';

interface IPros {}
const defaultProps = {};
const UserCenter: React.FC<IPros> = (props) => {
	useTitle('用户中心'); // 修改title
	return <div>userCenter</div>;
};
UserCenter.defaultProps = defaultProps;
export default memo(UserCenter);
