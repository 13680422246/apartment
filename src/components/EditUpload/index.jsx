import React, { useState } from 'react';
import { Upload, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { baseURL } from '../../config';

export default (function (props) {
	const [fileList, setFileList] = useState([{}]);
	const [defaultUplaodFile, setDefaultUplaodFile] = React.useState([
		{
			uid: '1',
			name: `${props.record.name}.jpg`,
			status: 'done',
			url: `${baseURL}\\images\\${props.record.url}.jpg`,
		},
	]);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	const handleCancel = () => {
		setPreviewVisible(false);
	};

	const handlePreview = async (file) => {
		setPreviewImage(file.url);
		setPreviewVisible(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
		);
	};

	const handleChange = ({ fileList }) => {
		setFileList(fileList);
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	const normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	return (
		<>
			<Form.Item
				valuePropName='fileList'
				getValueFromEvent={normFile}
				rules={[
					{
						required: true,
						message: '上传图片不能为空',
					},
				]}
				name='upload'>
				<Upload
					listType='picture-card'
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
					// 取消自动上传
					beforeUpload={() => false}
					defaultFileList={defaultUplaodFile}>
					{fileList.length >= 1 ? null : uploadButton}
				</Upload>
			</Form.Item>
			<Modal
				visible={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}>
				<img
					alt='example'
					style={{ width: '100%' }}
					src={previewImage}
				/>
			</Modal>
		</>
	);
});
