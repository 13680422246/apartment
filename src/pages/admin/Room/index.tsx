import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';
import useEdit from '../utils/useEdit';
import useDelete from '../utils/useDelete';

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

	// TODO: 房间的上传优点特殊，需要DataForm
	const editColumn = useEdit(`${BaseUrl}/edit`);
	newColumns.push(editColumn);

	// 删除数据
	const deleteColumn = useDelete(`${BaseUrl}/delete`);
	newColumns.push(deleteColumn);

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
