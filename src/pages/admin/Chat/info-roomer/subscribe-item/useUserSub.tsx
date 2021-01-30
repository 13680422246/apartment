import { useEffect } from 'react';
import { useRequest } from '../../../../../js';

/**
 * 根据用户id查找用户预约房间的信息
 * @param userid 用户id
 */
function useUserSub(userid: number) {
	const { run, loading, data, error } = useRequest<
		any,
		{
			userid: number;
		}
	>('/admin/subscribe/findUserSubscribe', {});

	useEffect(() => {
		run({
			userid,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		run,
		loading,
		data,
		error,
	};
}

export default useUserSub;
