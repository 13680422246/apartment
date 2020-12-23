import React, { memo } from 'react';
import { Form, Space, Button, Table } from 'antd';
import { useRequest } from '../../utils';
import EditableCell from './render/EditableCell';

interface IPros {
	// 默认每页显示的数量
	defaultPageSize: number;
	// 请求的基本URL
	BaseUrl: string;
	// 描述列对象
	columns: any[];
	// 处理请求的数据
	handleFetchData: Function;
	// 处理编辑的数据
	handleSave: Function;
	// 处理删除的数据
	handleDelete: Function;
	// 顶部显示
	modal: React.ReactNode;
}
const defaultProps = {
	defaultPageSize: 10,
	modal: '',
};
const EditableTableForm: React.FC<IPros> = (props) => {
	const [form] = Form.useForm(); // 为表单设置fomr对象

	/**
	 * 请求数据
	 */
	useRequest(`${props.BaseUrl}/findAll`, {
		onSuccess: ({ data }) => {},
	});

	/**
	 * 刷新页面
	 */
	const handleRefresh = () => {};

	/**
	 * 重置条件
	 */
	const handleReset = () => {};

	/**
	 * 合并列对象
	 */

	return (
		<>
			<div
				style={{
					padding: '5px',
				}}>
				<Space size='middle'>
					{props.modal}
					<Button type='primary' onClick={handleRefresh}>
						刷新页面
					</Button>
					<Button type='primary' onClick={handleReset}>
						重置条件
					</Button>
				</Space>
			</div>
			<Form form={form}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}></Table>
			</Form>
		</>
	);
};
EditableTableForm.defaultProps = defaultProps;
export default memo(EditableTableForm);
