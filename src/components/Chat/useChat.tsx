import { useCallback, useEffect, useState } from 'react';
import { useRequest } from '../../js';
import moment from 'moment';

/**
 * 管理聊天信息
 */
export interface IChat {
	id: number;
	userid: number;
	issend: number;
	content: string;
	createtime: string;
}
function useChat(
	isAdmin: boolean,
	disabled: boolean,
	userid: number,
	scroll: React.RefObject<HTMLDivElement>
) {
	const [chats, setChats] = useState<IChat[]>([]);
	const [current, setCurrent] = useState<number>(0); // 当前页数
	const [hasNextPage, setHasNextPage] = useState<boolean>(true); // 是否还能加载数据
	/**
	 * 加载更多聊天信息
	 */
	const URL = isAdmin ? '/admin/chat/findChat' : '/home/chat/findChat';
	const { run, loading: loadMoreLoading } = useRequest<
		{
			pageNum: number; // 第几页
			hasNextPage: boolean; // 是否还有下一个
			list: IChat[];
		},
		{
			userid: number;
			current: number;
			pageSize: number;
		}
	>(URL, {
		onSuccess: ({ data }) => {
			if (!scroll.current) throw new Error();
			// 设置内容之前的高度
			const beforeHeight = scroll.current.scrollHeight;
			setCurrent(data.pageNum);
			setHasNextPage(data.hasNextPage);
			setChats((datasource) => {
				const newData = [...datasource];
				if (Array.isArray(data.list)) {
					newData.unshift(...data.list.reverse());
				}
				return newData;
			});

			// 设置内容之后的高度
			const afterHeight = scroll.current.scrollHeight;
			// 滚动到原来的位置
			scroll.current.scrollTop = afterHeight - beforeHeight;
		},
	});

	/**
	 * 加载更多聊天信息
	 */
	const loadMore = useCallback(() => {
		run({
			userid,
			current: current + 1,
			pageSize: 10,
		});
	}, [current, run, userid]);

	/**
	 * 追加内容到聊天信息
	 * @param { string } content 聊天内容
	 * @param { 'left' | 'right' } dir 添加的方向，默认添加到右边
	 */
	const appendChat = useCallback(
		(content: string, isAdmin: boolean = true) => {
			setChats((chats) => {
				const newChats = [...chats];
				newChats.push({
					id: 1,
					userid,
					issend: isAdmin ? 0 : 1,
					content,
					createtime: moment().format('YYYY-MM-DD HH:mm:ss'),
				});
				return newChats;
			});
			// 滚动到底部
			if (scroll.current) {
				const height = scroll.current.scrollHeight;
				scroll.current.scrollTop = height;
			}
		},
		[scroll, userid]
	);

	// 进入的时候加载一次数据
	useEffect(() => {
		if (!disabled) {
			run({
				userid,
				current: 1,
				pageSize: 10,
			});
		}
		return () => {
			setChats([]);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userid]);

	return {
		loadMoreLoading,
		hasNextPage,
		chats,
		loadMore,
		appendChat,
	};
}

export default useChat;
