import { useRequest } from '../../../../../js';

function useRequestCheckInForm() {
	const { run, loading } = useRequest<
		{
			type: 'error' | 'success';
			msg: string;
		},
		{
			userid: number;
			roomid: number;
			checkintime: string;
			remark?: string;
		}
	>('/admin/subscribe/add', {
		onSuccess: ({ data, Hint }) => {
			if (data.type === 'error') {
				Hint({
					type: 'error',
					content: data.msg,
				});
			} else {
				Hint({
					type: 'success',
					content: '预约成功',
				});
			}
		},
	});
	return {
		run,
		loading,
	};
}

export default useRequestCheckInForm;
