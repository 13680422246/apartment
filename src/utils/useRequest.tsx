import Axios from 'axios';
import { baseURL } from '../config';
import { useState, useEffect, useRef } from 'react';
import { store } from '../store';
import { Hint, HintOptions } from '../components';
import Qs from 'qs';

const proxy = Axios.create({
	timeout: 1000 * 600, // 请求超时时间(毫秒)
	withCredentials: true, // 是否携带cookie信息
	baseURL: baseURL, // 请求接口地址
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	// 在请求发送之前处理参数
	transformRequest: [
		function (data) {
			// 如果token存在的话，带上token
			const token = store.getState().user.token;
			if (token) {
				data['token'] = token;
			}
			data = Qs.stringify(data);
			return data;
		},
	],
});

/**
 * 实现POST请求
 * 手动触发请求
 * 实现防抖测率、实现节流策略
 * @param url 请求地址，已经存在base url
 * @param params POST参数
 * @param confg 配置文件
 */
function useRequest<ResDataType, ParamsType>(
	url: string,
	options: {
		onSuccess?: (res: {
			data: ResDataType;
			params?: ParamsType;
			Hint: (options: HintOptions) => void;
		}) => void;
	}
) {
	const [loading, setLoading] = useState<boolean>(false); // 加载中
	const [error, setError] = useState<Error>(); // 错误信息
	const [data, setData] = useState<ResDataType>(); // 请求返回的数据
	const runing = useRef<boolean>(false); // 是否正在运行
	const source = Axios.CancelToken.source();

	useEffect(() => {
		return () => {
			if (runing.current) {
				runing.current = false;
				source.cancel();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const run = (params: ParamsType) => {
		runing.current = true; // 设置为可以运行
		setLoading(true); // 加载中
		proxy
			.post(url, params, {
				cancelToken: source.token,
			})
			.then((res) => {
				/**
				 * 转换数据
				 */
				if (res.status !== 200) {
					throw new Error('请求错误');
				}
				return res.data;
			})
			.then((data: ResDataType) => {
				if (runing.current) {
					/**
					 * 处理请求成功
					 */
					setLoading(false);
					setData(data);
					if (options.onSuccess) {
						options.onSuccess({
							data,
							params,
							Hint,
						});
					}
				}
			})
			.catch((err: Error) => {
				/**
				 * 处理请求失败
				 */
				if (runing.current) {
					setLoading(false);
					setError(err);
				}
			});
	};
	return {
		loading,
		data,
		error,
		run,
	};
}

export default useRequest;
