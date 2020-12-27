import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../utils';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';
import { IActionPopconfirm } from '../../../components/EditableTableForm/render/renderPopconfirm';
import { IActionSave } from '../../../components/EditableTableForm/render/renderEdit';

interface IPros {}
const Role: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/role';
	useTitle('角色管理');
	/**
	 * 加载数据
	 */
	const handleFetchData = useCallback(({ datasource, emit }) => {
		emit(datasource);
	}, []);
	/**
	 * 编辑数据
	 */
	const newColumns = [...columns] as any[];
	newColumns.push({
		title: '编辑',
		dataIndex: 'edit123',
		editor: {
			url: `${BaseUrl}/edit`, // 执行编辑的URL
			callback: ({ defaultHandleData, cancel, dispatch, Hint }: any) => {
				Hint('编辑成功');
				cancel();
				const datasource = defaultHandleData();
				if (datasource) {
					dispatch({
						type: 'data',
						args: [datasource],
					});
				}
			},
		},
	} as IActionSave);
	/**
	 * 删除数据
	 */
	newColumns.push({
		title: '删除',
		dataIndex: 'delete',
		popconfirm: {
			url: `${BaseUrl}/delete`,
			text: '删除',
			HintText: '确认删除?',
			callback: ({ Hint, operator, dispatch }) => {
				Hint('删除成功'); // 提示
				const datasource = operator.delete(); // 执行删除动作
				if (datasource) {
					dispatch({
						type: 'data',
						args: [datasource],
					});
				}
			},
		},
	} as IActionPopconfirm);

	return (
		<TableForm
			fetchUrl={`${BaseUrl}/findAll`}
			columns={newColumns}
			handleFetchData={handleFetchData}
		/>
	);
};
export default memo(Role);
