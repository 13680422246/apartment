import { useCallback, useEffect, useState } from 'react';
import { useRequest } from '../../../utils';

/**
 * 用户未读信息的管理
 * @param { boolean } disable 是否禁用
 */
function useUnread() {
	// 未读信息
	const [unread, setUnread] = useState<number>(0);

	/**
	 * 请求未读信息
	 */
	const { loading, run } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{}
	>('/home/chat/findUnread', {
		onSuccess: ({ data, Hint }) => {
			if (data.type === 'error') {
				Hint({
					type: 'error',
					content: data.msg,
				});
			} else {
				setUnread(parseInt(data.msg));
			}
		},
	});

	/**
	 * 提交未读信息
	 */
	const { run: postUnread } = useRequest<
		{},
		{
			unread: number;
		}
	>('/home/chat/setup', {});

	/**
	 * 一进来就是加载
	 */
	useEffect(() => {
		run({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * 设置未读信息条数
	 * @param { number } unread 增加的条数
	 */
	const increment = useCallback(() => {
		setUnread((unread) => unread + 1);
		postUnread({
			unread: unread + 1,
		});
	}, [postUnread, unread]);

	/**
	 * 清除未读信息
	 */
	const clearUnread = useCallback(() => {
		setUnread(0);
	}, []);

	return {
		unread,
		increment,
		clearUnread,
		loading,
	};
}

export default useUnread;
