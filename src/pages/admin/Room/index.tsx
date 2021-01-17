import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';

interface IPros {}
const defaultProps = {};
const Room: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/room';
	const newColumns = [...columns] as any[];
	useTitle('房间管理');

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
Room.defaultProps = defaultProps;
export default memo(Room);
