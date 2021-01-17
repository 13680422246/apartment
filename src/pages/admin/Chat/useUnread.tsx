import { useRequest } from '../../../js';

function useUnread() {
	/**
	 * 提交未读信息
	 */
	const { run: postUnread } = useRequest<
		{},
		{
			unread: number;
			userid: number;
		}
	>('/admin/chat/setup', {});
	return {
		postUnread,
	};
}

export default useUnread;
