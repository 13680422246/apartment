import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import columns from './columns';
import TableForm from '../../../components/EditableTableForm';
import useEdit from '../utils/useEdit';
import useDelete from '../utils/useDelete';

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

	// 编辑数据
	const editColumn = useEdit(`${BaseUrl}/edit`, '编辑工资');
	newColumns.push(editColumn);

	// 删除数据
	const deleteColumn = useDelete(`${BaseUrl}/delete`, {
		title: '解雇',
		text: '解雇',
		HintText: '确认解雇?',
	});
	newColumns.push(deleteColumn);

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
