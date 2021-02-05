import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal, Form } from 'antd';
/**
 * File ---> Base64
 * @param {File} file 文件
 */
export function fileToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
function MyUplaod(props) {
	const [previewVisible, setPreviewVisible] = useState(false); // 控制预览modal
	const [previewImage, setPreviewImage] = useState(''); // 存储图片的base64编码，可供预览
	const [previewTitle, setPreviewTitle] = useState(''); // 预览图片名
	const [fileList, setFileList] = useState([]); // 存储图片文件

	const handleCancel = () => {
		setPreviewVisible(false);
	};

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await fileToBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(file.name);
	};

	const handleChange = ({ fileList }) => {
		setFileList(fileList);
	};

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
				name='upload'
				label='Upload'
				extra='图片仅支持jpg/png格式'
				rules={[
					{
						required: true,
						message: '图片不能为空',
					},
				]}>
				<Upload
					listType='picture-card'
					fileList={fileList}
					// 取消自动上传
					beforeUpload={() => false}
					onPreview={handlePreview}
					onChange={handleChange}>
					{fileList.length >= 1 ? null : (
						<div>
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Upload</div>
						</div>
					)}
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
}
export default MyUplaod;
