import React, { memo } from 'react';
import { Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

const Delete: React.FC<{
	record: any;
	handleDelete?: Function;
}> = memo((props) => {
	const handleDelete = (row: any) => {};
	return (
		<Popconfirm
			title='Sure to delete?'
			onConfirm={() => handleDelete(props.record)}>
			<NavLink
				to='#'
				onClick={(e) => {
					e.preventDefault();
				}}>
				Delete
			</NavLink>
		</Popconfirm>
	);
});

const renderDelete = (text: string, record: any, handleDelete: Function) => {
	// 编辑的时候不能删除
	return <Delete record={record} handleDelete={handleDelete} />;
};
export default renderDelete;
