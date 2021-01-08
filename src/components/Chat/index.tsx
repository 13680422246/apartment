import React, { memo, useCallback, useRef } from 'react';
import { List, Spin, Typography, Form, Input, Button } from 'antd';
import useChat from './useChat';
import style from './index.module.scss';
import moment from 'moment';

interface IPros {
	isAdmin: boolean; // 是否为管理员
	userid: number; // 用户id
	username: string; // 用户名
	buttonOptions?: {
		text: string; // 按钮内容
		disabled: boolean; // 是否禁用
		callback: (text: string) => void; // 发送内容
	}; // 发送按钮选项
	style?: React.CSSProperties;
}
const defaultProps = {
	isAdmin: true,
	buttonOptions: {
		text: '发送',
		disabled: false,
		callback: () => {},
	},
};
const Chat: React.FC<IPros> = (props) => {
	const [form] = Form.useForm();
	const scroll = useRef<HTMLDivElement>(null);
	const {
		loadMoreLoading,
		hasNextPage,
		chats,
		loadMore,
		appendChat,
	} = useChat(
		props.isAdmin,
		props.buttonOptions?.disabled as boolean,
		props.userid,
		scroll
	);

	/**
	 * 点击发送按钮
	 */
	const handleClick = useCallback(() => {
		form.validateFields().then((rows: { content: string }) => {
			// 交给用户处理
			if (props.buttonOptions && props.buttonOptions.callback) {
				props.buttonOptions.callback(rows.content);
			}
			// 追加内容到聊天列表
			appendChat(rows.content);
			form.resetFields(); // 重置表单
		});
	}, [appendChat, form, props.buttonOptions]);

	const isShow = chats.length === 0;
	return (
		<div className={style.container}>
			<div style={props.style} className={style.header} ref={scroll}>
				{isShow ? (
					<Spin size='large' className={style.center}></Spin>
				) : (
					<>
						<List
							header={
								loadMoreLoading ? (
									<Spin className={style.loadmore}></Spin>
								) : hasNextPage ? (
									<Typography.Link
										className={style.loadmore}
										onClick={loadMore}>
										加载更多聊天信息
									</Typography.Link>
								) : null
							}
							dataSource={chats}
							renderItem={(item) => {
								return item.issend === 0 ? (
									<List.Item
										className={
											props.isAdmin
												? style.right
												: style.left
										}>
										<Typography.Paragraph>
											<Typography.Title
												className={style.title}
												level={5}>
												客服
											</Typography.Title>
											<div className={style.content}>
												<Typography.Text type='secondary'>
													{item.content}
												</Typography.Text>
											</div>
										</Typography.Paragraph>
									</List.Item>
								) : (
									<List.Item
										className={
											props.isAdmin
												? style.left
												: style.right
										}>
										<Typography.Paragraph>
											<Typography.Title
												className={style.title}
												level={5}>
												{props.username}-
												<span className={style.time}>
													{moment(
														item.createtime
													).format(
														'YYYY-MM-DD HH:mm:ss'
													)}
												</span>
											</Typography.Title>
											<div className={style.content}>
												<Typography.Text type='secondary'>
													{item.content}
												</Typography.Text>
											</div>
										</Typography.Paragraph>
									</List.Item>
								);
							}}
						/>
					</>
				)}
			</div>
			{isShow ? null : (
				<Form form={form} className={style.form}>
					<Form.Item
						name='content'
						rules={[
							{
								required: true,
								message: '内容不能为空',
							},
							{
								max: 128,
								message: '最多128个字符',
							},
						]}>
						<Input.TextArea
							autoFocus={true}
							showCount={true}
							maxLength={128}
							onPressEnter={(e) => {
								e.preventDefault();
								handleClick();
							}}
							rows={4}></Input.TextArea>
					</Form.Item>
					<Button
						onClick={handleClick}
						disabled={props.buttonOptions?.disabled}
						className={style.button}>
						{props.buttonOptions?.text}
					</Button>
				</Form>
			)}
		</div>
	);
};
Chat.defaultProps = defaultProps;
export default memo(Chat, (prevProps, nextProps) => {
	if (prevProps.userid === nextProps.userid) return true;
	else return false;
});
