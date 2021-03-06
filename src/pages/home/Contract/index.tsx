import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import columns from './columns';
import TableForm from '../../../components/EditableTableForm';

interface IPros {}
const Contract: React.FC<IPros> = (props) => {
	const BaseUrl = '/home/contract';
	const newColumns = [...columns] as any[];

	useTitle('我的合同');

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
export default memo(Contract);
