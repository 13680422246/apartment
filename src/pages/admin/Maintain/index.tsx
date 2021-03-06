import React, { memo, useCallback } from 'react';
import { useTitle } from '../../../js';
import TableForm from '../../../components/EditableTableForm';
import columns from './columns';
import useEdit from '../utils/useEdit';

interface IPros {}
const Maintain: React.FC<IPros> = (props) => {
	const BaseUrl = '/admin/maintain';
	const newColumns = [...columns] as any[];

	// 修改标题
	useTitle('维修管理');

	// 处理加载的数据
	const handleFetchData = useCallback(({ datasource, emit }) => {
		emit(datasource);
	}, []);

	// 编辑数据
	const editColumn = useEdit(`${BaseUrl}/edit`, '维修完成');
	newColumns.push(editColumn);

	return (
		<TableForm
			fetchUrl={`${BaseUrl}/findAll`}
			columns={newColumns}
			handleFetchData={handleFetchData}
		/>
	);
};
export default memo(Maintain);
