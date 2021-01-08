import React, { memo, useCallback, useMemo, useState } from 'react';
import { Modal } from 'antd';
import { Chat as ChatComponent } from '../../../components';
import { websocketBaseURL } from '../../../config';
import { useWebSocket, isIntNumber } from '../../../utils';
import { useUserStore } from '../../../store/userRedcer/dispatch';
import { NavLink } from 'react-router-dom';

interface IPros {}
const defaultProps = {};
const Chat: React.FC<IPros> = (props) => {
	const [visible, setVisible] = useState<boolean>(false); // 是否显示聊天界面
	const userStore = useUserStore();
	// 连接聊天服务器
	// disable: 如果连接聊天服务器失败就为true
	const { disable } = useWebSocket(
		`${websocketBaseURL}/${userStore.token}`,
		() => {}
	);

	// 打开聊天界面
	const handelOpen = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
			e.preventDefault();
			setVisible(true);
		},
		[]
	);
	// 取消聊天界面
	const handleCancel = useCallback(() => {
		setVisible(false);
	}, []);

	// button选项
	const buttonOptions = useMemo<{
		text: string;
		disabled: boolean;
	}>(() => {
		// 管理员
		if (isIntNumber(userStore.roleid)) {
			return {
				text: '管理员无法使用后该功能',
				disabled: true,
			};
		}
		// 是否连接失败
		return {
			text: disable ? '连接聊天服务器失败' : '发送',
			disabled: disable,
		};
	}, [disable, userStore.roleid]);

	return (
		<>
			<NavLink to='' onClick={handelOpen}>
				联系客服
			</NavLink>
			<Modal
				title='客服'
				visible={visible}
				footer={[]}
				onCancel={handleCancel}>
				<ChatComponent
					style={{
						maxHeight: '500px',
					}}
					isAdmin={false}
					userid={3}
					username={userStore.username}
					buttonOptions={{
						...buttonOptions,
						callback: () => {},
					}}
				/>
			</Modal>
		</>
	);
};
Chat.defaultProps = defaultProps;
export default memo(Chat);
