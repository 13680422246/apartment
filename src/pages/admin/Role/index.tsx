import React, { memo } from 'react';
import { useTitle } from '../../../utils';

interface IPros {}
const Role: React.FC<IPros> = (props) => {
	useTitle('角色管理');
	return <div>Role</div>;
};
export default memo(Role);
