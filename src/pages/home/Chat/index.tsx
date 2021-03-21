import React, { memo, useCallback, useRef } from 'react';
import { Modal, Tooltip, Badge, Grid } from 'antd';
import {
	Chat as ChatComponent,
	A,
	IChatImperativeHandle,
} from '../../../components';
import { websocketBaseURL } from '../../../config';
import { useWebSocket, isIntNumber, useToggle } from '../../../js';
import { useUserStore } from '../../../store/userRedcer/dispatch';
import style from './index.module.scss';
import useUnread from './useUnread';

const { useBreakpoint } = Grid;

interface IPros {}
const defaultProps = {};
const Chat: React.FC<IPros> = (props) => {
	const userStore = useUserStore();
	const chatRef = useRef<IChatImperativeHandle>(null);
	const isRole = isIntNumber(userStore.roleid); // 是否为管理员
    const screen = useBreakpoint();

	// 控制modal的开关
	const { visible, toggle } = useToggle();

	/**
	 * 管理unread未读信息
	 */
	const { unread, increment, clearUnread } = useUnread();

	/**
	 * 连接聊天服务器
	 */
	const { disable, sendContent: websocketSendContent } = useWebSocket(
		`${websocketBaseURL}/${userStore.token}`,
		(data) => {
			// 接收到的聊天信息
			if (typeof data === 'string') {
				// 如果来哦天窗口已经打开 ， 追加到聊天信息
				if (visible && chatRef.current) {
					chatRef.current.appendChat(data);
				}
				// 聊天窗口是关闭的状态 ， 更新未读信息
				else {
					// 设置未读信息
					increment();
				}
			}
		}
	);

	/**
	 * 发送聊天内容
	 */
	const sendContent = useCallback(
		(content: string) => {
			if (chatRef.current) {
				// 发送到聊天服务器
				// 对于用户发送，后台会根据token解析得到userid
				// 所以这里传递任意值即可
				websocketSendContent(0, content);
				chatRef.current.appendChat(content, false);
			}
		},
		[websocketSendContent]
	);

	/**
	 * 打开modal
	 */
	const handleClick = useCallback(
		() => {
			clearUnread();
			toggle();
		},
		[toggle, clearUnread]
	);

	/**
	 * 渲染1: 管理员无法使用该功能
	 */
	if (isRole) {
		return (
			<Tooltip title='管理员无法使用' placement='bottom'>
				<span
					style={{
						display: 'inline-block',
					}}>
					<A disable={true}>联系客服</A>
				</span>
			</Tooltip>
		);
	}

	/**
	 * 渲染2: 正常使用 or 连接失败
	 */
	// onClick={openModal}
	return (
		<>
			<div className={style.badge} >
				<Badge count={unread}>
					<A handleClick={handleClick}>联系客服</A>
				</Badge>
			</div>
			<Modal title='客服' visible={visible} footer={[]} onCancel={toggle}>
				<ChatComponent
					ref={chatRef}
					style={screen.xs ? {
						maxHeight: '300px',
					} : {
                        maxHeight: '500px',
                    }}
					isAdmin={false}
					userid={3}
					username={userStore.username}
					buttonOptions={{
						text: disable ? '连接聊天服务器失败' : '发送',
						disabled: disable,
						callback: sendContent,
					}}
				/>
			</Modal>
		</>
	);
};
Chat.defaultProps = defaultProps;
export default memo(Chat);
