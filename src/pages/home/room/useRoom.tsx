import { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Room as RoomType } from '../../../components';
import { useRequest } from '../../../js';
import { Result, Button } from 'antd';
import style from './index.module.scss';

/**
 * 获取房间数据
 */
function useRoom() {
	const history = useHistory();
	const params = useParams<{ id: string }>(); // 获取路由参数
	const { state } = useLocation<{ room: RoomType }>(); // 从首页点击传递过来的参数
	const [room, setRoom] = useState<RoomType | undefined>(() => {
		if (!state) return undefined;
		else return state.room;
	});
	/**
	 * 请求数据
	 */
	const { loading, run, error } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{}
	>(`/home/room/${params.id}`, {
		onSuccess: ({ data, params }) => {
			setRoom(JSON.parse(data.msg));
		},
		onError: () => {},
	});
	useEffect(() => {
		// 如果传递过来的state为空，则请求数据
		if (!room) {
			run({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	// 网络错误 | 房间不存在错误
	let errorComponent: React.ReactNode = null;
	if (error) {
		const options = {
			text: '房间不存在',
			callback: () => {
				history.push('/');
			},
		};
		if (/netword/i.test(error.message)) {
			options.text = '网络错误';
			options.callback = () => {
				console.info(`刷新`);
			};
		}
		errorComponent = (
			<Result
				className={style.result}
				title={options.text}
				extra={
					<Button type='primary' onClick={options.callback}>
						回到首页
					</Button>
				}></Result>
		);
	}

	return {
		loading,
		room,
		errorComponent,
	};
}

export default useRoom;
