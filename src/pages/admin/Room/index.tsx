import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';
import useDelete from '../utils/useDelete';
import usePostRoom from './usePostRoom';
import AddModal from './addModal';
import { Button } from 'antd';

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
	const editColumn = usePostRoom(`${BaseUrl}/edit`);
	newColumns.push(editColumn);

	// 删除数据
	const deleteColumn = useDelete(`${BaseUrl}/delete`);
	newColumns.push(deleteColumn);

	return (
		<TableForm
			modal={
				<AddModal
					component={
						<Button type='primary'>添加房间</Button>
					}></AddModal>
			}
			fetchUrl={`${BaseUrl}/findAll`}
			columns={newColumns}
			handleFetchData={handleFetchData}
		/>
	);
};
Room.defaultProps = defaultProps;
export default memo(Room);
