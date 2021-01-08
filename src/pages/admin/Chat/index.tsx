import React, { memo, useCallback, useState } from 'react';
import { useTitle, localeMoment, useWebSocket } from '../../../utils';
import useFriends, { IFriend } from './useFriends';
import style from './index.module.scss';
import { Chat as ChatComponent } from '../../../components';
import { websocketBaseURL } from '../../../config';
import { useUserStore } from '../../../store/userRedcer/dispatch';
import { Skeleton } from 'antd';

const TempSkeleton: React.FC<{}> = (props) => {
	return (
		<div
			style={{
				marginBottom: '20px',
			}}>
			<Skeleton
				avatar
				active
				paragraph={{
					rows: 1,
				}}
			/>
		</div>
	);
};

interface IPros {}
const defaultProps = {};
const Chat: React.FC<IPros> = (props) => {
	// 修改html标题
	useTitle('聊天管理');
	const userStore = useUserStore();
	// 管理朋友列表
	const { friends, friendsLoading } = useFriends();
	// 连接聊天服务器
	// disable: 如果连接聊天服务器失败就为true
	const {
		disable,
		sendContent,
	} = useWebSocket(`${websocketBaseURL}/${userStore.token}`, () => {});
	// 当前聊天的用户
	const [currentFriend, seTcurrentFriend] = useState<IFriend | undefined>(
		undefined
	);

	// 切换用户
	const handleChange = (friend: IFriend) => {
		seTcurrentFriend(friend);
	};

	/**
	 * 发送内容
	 */
	const handleSend = useCallback(
		(content: string) => {
			if (currentFriend !== undefined) {
				sendContent(parseInt(currentFriend.userid), content);
			}
		},
		[currentFriend, sendContent]
	);

	return (
		<div className={style.container}>
			<div className={style.friends}>
				{friendsLoading ? (
					<>
						{Array.from({ length: 6 }).map((_, index) => (
							<TempSkeleton key={index} />
						))}
					</>
				) : (
					<>
						{friends.map((friend) => {
							const isMore99 = parseInt(friend.unread) > 99; // 未读信息是否超过99条(不包括99)
							return (
								<div
									key={friend.userid}
									onClick={() => handleChange(friend)}
									className={`${style.friend} ${
										currentFriend?.userid === friend.userid
											? style.active
											: ''
									}`}>
									<div className={style.header}>
										<span className={style.username}>
											{friend.username}
										</span>
										<span className={style.time}>
											{localeMoment(
												friend.lasttime
											).toNow()}
										</span>
									</div>
									<div className={style.footer}>
										<div className={style.content}>
											{friend.lastContent}
										</div>
										<span
											hidden={!friend.unread}
											style={
												isMore99
													? {
															width: '25px',
															height: '25px',
													  }
													: {}
											}
											className={style.unread}>
											{isMore99 ? '99+' : friend.unread}
										</span>
									</div>
								</div>
							);
						})}
					</>
				)}
			</div>
			<div hidden={currentFriend === undefined} className={style.chat}>
				{currentFriend !== undefined ? (
					<ChatComponent
						isAdmin={true}
						userid={parseInt(currentFriend.userid)}
						username={currentFriend.username}
						buttonOptions={{
							disabled: disable,
							text: disable ? '连接聊天服务器失败' : '发送',
							callback: handleSend,
						}}
					/>
				) : null}
			</div>
		</div>
	);
};
Chat.defaultProps = defaultProps;
export default memo(Chat);
