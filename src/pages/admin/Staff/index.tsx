import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import {} from '../../../components/EditableTableForm';
import columns from './columns';
import TableForm from '../../../components/EditableTableForm';

interface IPros {}
const defaultProps = {};
const Staff: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/staff';
	const newColumns = [...columns] as any[];

	// 修改标题
	useTitle('员工管理');

	// 处理加载的数据
	const handleFetchData = useCallback(({ datasource, emit }) => {
		emit(datasource);
	}, []);

	return (
		<TableForm
			fetchUrl={`${BaseUrl}/findAll`}
			columns={newColumns}
			handleFetchData={handleFetchData}
		/>
	);
};
Staff.defaultProps = defaultProps;
export default memo(Staff);
