import React, { memo, useCallback } from 'react';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';
import { useTitle } from '../../../js';

interface IPros {}
const defaultProps = {};
const Roomer: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/roomer';
	const newColumns = [...columns] as any[];

	// 修改标题
	useTitle('房客管理');

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
Roomer.defaultProps = defaultProps;
export default memo(Roomer);
