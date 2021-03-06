import React, { memo, useCallback } from 'react';
import TableForm from '../../../components/EditableTableForm';
import { useTitle } from '../../../js';
import columns from './columns';

interface IPros {}
/**
 * 预约表单: 使用列表，无线加载即可
 */
const Subscribe: React.FC<IPros> = (props) => {
	const BaseUrl = '/home/subscribe';
	const newColumns = [...columns] as any[];

	useTitle('我的预约'); // 修改title

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
