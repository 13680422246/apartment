import { useEffect, useState } from 'react';
import { useRequest } from '../../../utils';

/**
 * 管理朋友列表
 */
// 朋友信息
export interface IFriend {
	userid: string;
	username: string;
	unread: string;
	lasttime: string;
	lastContent: string;
}
function useFriends() {
	const [friends, setFriends] = useState<IFriend[]>([]); // 朋友列表

	const { run: loadFriends, loading: friendsLoading } = useRequest<
		IFriend[],
		{}
	>('/admin/chat/findFriedns', {
		onSuccess: ({ data }) => {
			setFriends(data);
		},
	});
	// 一进来就是加载朋友列表
	useEffect(() => {
		loadFriends({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		friendsLoading,
		friends,
	};
}

export default useFriends;
