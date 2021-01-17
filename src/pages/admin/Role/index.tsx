import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';
import useDelete from '../utils/useDelete';
import useEdit from '../utils/useEdit';
import AuthorityModal from './AuthorityModal';
import AddModal from './AddModal';

interface IPros {}
const Role: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/role';
	const newColumns = [...columns] as any[];

	// 修改标题
	useTitle('角色管理');

	// 处理加载的数据
	const handleFetchData = useCallback(({ datasource, emit }) => {
		emit(datasource);
	}, []);

	// 授权
	newColumns.push({
		title: '授权',
		dataIndex: 'authority',
		render: (text: string, record: any) => (
			<AuthorityModal text={text} record={record} />
		),
	});

	// 编辑数据
	const editColumn = useEdit(`${BaseUrl}/edit`);
	newColumns.push(editColumn);

	// 删除数据
	const deleteColumn = useDelete(`${BaseUrl}/delete`);
	newColumns.push(deleteColumn);

	return (
		<TableForm
			modal={<AddModal url={`${BaseUrl}/add`} />}
			fetchUrl={`${BaseUrl}/findAll`}
			columns={newColumns}
			handleFetchData={handleFetchData}
		/>
	);
};
export default memo(Role);
