import { useCallback, useEffect, useState } from 'react';
import { useRequest } from '../../utils';

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
function useChat(userid: number, scroll: React.RefObject<HTMLDivElement>) {
	const [chats, setChats] = useState<IChat[]>([]);
	const [current, setCurrent] = useState<number>(0); // 当前页数
	const [hasNextPage, setHasNextPage] = useState<boolean>(true); // 是否还能加载数据
	/**
	 * 加载更多聊天信息
	 */
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
	>('/admin/chat/findChat', {
		onSuccess: ({ data }) => {
			if (!scroll.current) throw new Error();
			// 设置内容之前的高度
			const beforeHeight = scroll.current.scrollHeight;
			setCurrent(data.pageNum);
			setHasNextPage(data.hasNextPage);
			setChats((datasource) => {
				const newData = [...datasource];
				newData.unshift(...data.list.reverse());
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
	 */
	const appendChat = useCallback(
		(content: string) => {
			setChats((chats) => {
				const newChats = [...chats];
				newChats.push({
					id: 1,
					userid,
					issend: 0,
					content,
					createtime: new Date().getTime().toString(),
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
		run({
			userid,
			current: 1,
			pageSize: 10,
		});
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
