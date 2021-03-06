import React from 'react';
import { Form, Input } from 'antd';
import { FormModal, Hint, MyUpload } from '../../../components';
import { POSTROOM } from '../../../js/proxy';

function AddModal(props) {
	const callback = ({ row, setVisible, setConfirmLoading, resetFields }) => {
		setConfirmLoading(true);
		POSTROOM(
			'/admin/room/add',
			row,
			() => {
				Hint({
					type: 'success',
					content: '添加成功',
				});
				setVisible(false);
				setConfirmLoading(false);
				resetFields();
			},
			() => {
				setConfirmLoading(false);
			}
		);
	};
	return (
		<>
			<FormModal
				component={props.component}
				title='添加房间'
				callback={callback}>
				<MyUpload />
				<Form.Item
					name='name'
					label='房间名'
					rules={[
						{
							required: true,
							message: '房间名称不能为空',
						},
					]}>
					<Input placeholder='房间名' />
				</Form.Item>
				<Form.Item
					name='housetype'
					label='户型'
					rules={[
						{
							required: true,
							message: '户型不能为空',
						},
					]}>
					<Input placeholder='户型' />
				</Form.Item>
				<Form.Item
					name='dir'
					label='朝向'
					rules={[
						{
							required: true,
							message: '朝向不能为空',
						},
					]}>
					<Input placeholder='朝向' />
				</Form.Item>
				<Form.Item
					label='标签'
					name='tags'
					rules={[
						{
							required: true,
							message: '标签不能为空',
						},
					]}>
					<Input placeholder='标签,请使用/分割' />
				</Form.Item>
				<Form.Item
					name='area'
					label='面积'
					rules={[
						{
							required: true,
							message: '面积不能为空',
						},
					]}>
					<Input
						placeholder='面积'
						step='10'
						type='number'
						suffix={
							<span>
								m<sup>2</sup>
							</span>
						}
					/>
				</Form.Item>
				<div>
					<Form.Item
						name='price'
						label='价格'
						rules={[
							{
								required: true,
								message: '价格不能为空',
							},
						]}>
						<Input
							placeholder='价格'
							step='10'
							type='number'
							suffix='元/月'
						/>
					</Form.Item>
				</div>
			</FormModal>
		</>
	);
}

export default AddModal;
