import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';
import useDelete from '../utils/useDelete';
import useEdit from '../utils/useEdit';
import AddModal from './AddModal';

interface IPros {}
const defaultProps = {};
const Permission: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/permission';
	const newColumns = [...columns] as any[];
	useTitle('权限管理');

	// 处理加载的数据
	const handleFetchData = useCallback(({ datasource, emit }) => {
		const map: {
			[propsname: string]: any;
		} = {};
		const childs = []; // 处理还没有处理的二级权限
		// 处理顶级权限
		for (const item of datasource) {
			if (item.parentid == null) {
				map[item.id] = item;
			} else {
				childs.push(item);
			}
		}
		// 处理二级权限
		for (const item of childs) {
			const parent = map[item.parentid];
			// 如果存在顶级权限
			if (!!parent) {
				if (!parent.children) parent.children = [];
				parent.children.push(item);
			}
			// 顶级权限不存在
			else {
				map[item.id] = item;
			}
		}
		emit(Object.values(map));
	}, []);

	// 添加子权限
	newColumns.push({
		title: '添加子权限',
		dataIndex: 'add',
		render: (text: string, record: any) => {
			if (!record.parentid) {
				return (
					<AddModal
						url={`${BaseUrl}/add`}
						title={`添加${record.name}的子权限`}
						parentid={record.id}
					/>
				);
			} else {
				return null;
			}
		},
	});

	// 编辑数据
	const editColumn = useEdit(`${BaseUrl}/edit`);
	newColumns.push(editColumn);

	// 删除数据
	const deleteColumn = useDelete(`${BaseUrl}/delete`);
	newColumns.push(deleteColumn);

	return (
		<TableForm
			modal={
				<AddModal url={`${BaseUrl}/add`} title='添加权限' parentid='' />
			}
			fetchUrl={`${BaseUrl}/findAll`}
			columns={newColumns}
			handleFetchData={handleFetchData}
			defaultPageSize={100}
		/>
	);
};
Permission.defaultProps = defaultProps;
export default memo(Permission);
