import { useRequest } from '../../../../../js';

/**
 * 取消用户预约
 */
function useCancelSub() {
	const { loading, run } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			roomid: number;
			userid: number;
		}
	>('/admin/subscribe/cancel', {
		onSuccess: ({ Hint, data }) => {
			Hint({
				type: data.type,
				content: data.type === 'error' ? data.msg : '取消成功',
			});
		},
	});

	return {
		cancel: run,
		cancelLoading: loading,
	};
}

export default useCancelSub;
