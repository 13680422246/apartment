import { useCallback, useEffect, useState } from 'react';
import { useRequest } from '../../../js';
import moment from 'moment';
import useUnread from './useUnread';

/**
 * 管理朋友列表
 */
// 朋友信息
export interface IFriend {
	userid: number;
	username: string;
	unread: number;
	lasttime: string;
	lastContent: string;
	isFinishInfo: boolean; // 是否完善好用户信息
}
function useFriends() {
	const [friends, setFriends] = useState<IFriend[]>([]); // 朋友列表

	/**
	 * 加载朋友列表信息
	 */
	const { run: loadFriends, loading: friendsLoading } = useRequest<
		IFriend[],
		{}
	>('/admin/chat/findFriedns', {
		onSuccess: ({ data }) => {
			setFriends(data);
		},
	});

	/**
	 * 管理未读信息
	 */
	const { postUnread } = useUnread();

	/**
	 * 一进来就是加载朋友列表
	 */
	useEffect(() => {
		loadFriends({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * @param { IFriend } friend
	 */
	const appendFriend = useCallback((friend: IFriend) => {
		setFriends((friends) => {
			const newFriends = [...friends];
			newFriends.push(friend);
			return newFriends;
		});
	}, []);

	/**
	 * 更新朋友信息
	 * @param { number } userid 用户id，更新谁的信息
	 * @param { number } unread 增加的未读条数
	 * @param { string } lastContent 追后的聊天信息
	 */
	const updateFriend = useCallback(
		(
			userid: number,
			setUnread: (unread: number) => number,
			lastContent?: string
		) => {
			setFriends((friends) => {
				const newFriends = [...friends]; // copy
				let isPushTop = false; // 是否放在第一位
				// 找出来
				const index = newFriends.findIndex(
					(friend) => friend.userid === userid
				);
				if (index !== -1) {
					const friend = newFriends.splice(index, 1)[0]; // copy
					const newFriend = { ...friend };
					// 更新信息
					newFriend.unread = setUnread(newFriend.unread);
					if (lastContent !== undefined) {
						newFriend.lastContent = lastContent;
						// 只有内容更新后，lasttime才会更新
						newFriend.lasttime = moment().format(
							'YYYY-MM-DD HH:mm:ss'
						);
						isPushTop = true; // 放在第一位
					}
					// 提交未读信息
					postUnread({
						unread: newFriend.unread,
						userid: newFriend.userid,
					});
					/**
					 * 如果lasttime更新了，就是放在第一位，否则放回原来的位置
					 */
					if (isPushTop) {
						newFriends.unshift(newFriend);
					}
					// 否则放回原处
					else {
						newFriends.splice(index, 0, newFriend);
					}
				}
				return newFriends;
			});
		},
		[postUnread]
	);

	return {
		friendsLoading,
		friends,
		appendFriend,
		updateFriend,
	};
}

export default useFriends;
