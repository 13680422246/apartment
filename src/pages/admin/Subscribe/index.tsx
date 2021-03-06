import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import {} from '../../../components/EditableTableForm';
import columns from './columns';
import TableForm from '../../../components/EditableTableForm';

interface IPros {}
const Subscribe: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/subscribe';
	const newColumns = [...columns] as any[];

	useTitle('预约管理'); // 修改title

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
export default memo(Subscribe);
