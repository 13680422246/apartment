import React, { memo, useContext } from 'react';
import { Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';
import { TableFormContext } from '../Provider';

const Delete: React.FC<{
	record: any;
	handleDelete?: Function;
}> = memo((props) => {
	const { state } = useContext(TableFormContext);
	/**
	 * 处理删除事件
	 */
	const handleDelete = (row: any) => {};
	return (
		<Popconfirm
			disabled={state.editingKey !== ''}
			title='确定删除?'
			onConfirm={() => handleDelete(props.record)}>
			<NavLink
				to='#'
				onClick={(e) => {
					e.preventDefault();
				}}>
				删除
			</NavLink>
		</Popconfirm>
	);
});

const renderDelete = (text: string, record: any, handleDelete: Function) => {
	// 编辑的时候不能删除
	return <Delete record={record} handleDelete={handleDelete} />;
};
export default renderDelete;
