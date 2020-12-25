import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../utils';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';

interface IPros {}
const Role: React.FC<IPros> = (props) => {
	useTitle('角色管理');
	const handleFetchData = useCallback(() => {}, []);
	return (
		<TableForm
			BaseUrl='/admin/role'
			columns={columns}
			handleFetchData={handleFetchData}
		/>
	);
};
export default memo(Role);
