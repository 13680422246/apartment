import Axios from 'axios';
import { baseURL } from '../../config';
import { useState, useEffect, useRef, useCallback } from 'react';
import { store } from '../../store';
import { Hint, HintOptions } from '../../components';
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
			const user = store.getState().user;
			const token = (user && user.token) || '';
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
 * @param options 配置文件
 * @returns { run,loading,data,error }
 */
function useRequest<ResDataType, ParamsType>(
	url: string,
	options: {
		// 成功回调
		onSuccess?: (res: {
			data: ResDataType;
			params?: ParamsType;
			Hint: (options: HintOptions) => void;
			values?: {
				[propsname: string]: any;
			};
		}) => void;
		// 失败回调
		onError?: (res: {
			error: Error;
			Hint: (options: HintOptions) => void;
		}) => void;
		// 配置项
		options?: {};
	} = {}
) {
	const [loading, setLoading] = useState<boolean>(false); // 加载中
	const [error, setError] = useState<Error>(); // 错误信息
	const [data, setData] = useState<ResDataType>(); // 请求返回的数据
	const running = useRef<boolean>(false); // 是否正在运行
	const source = Axios.CancelToken.source(); // 取消axios请求

	/**
	 * 为options添加默认值
	 */
	options = {
		...{
			onError: ({ Hint, error }) => {
				Hint({
					type: 'warning',
					content: error.message,
				});
			},
		},
		...options,
	};

	/**
	 * 组件结束的时候
	 * 取消请求，设置running = false-防止内存泄漏
	 */
	useEffect(() => {
		running.current = true;
		return () => {
			if (running.current) {
				running.current = false;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	/**
	 * 传递参数，发送请求
	 * @param params POST参数
	 * @param values 传递给onSuccess的额外参数
	 */
	const run = useCallback(
		(
			params: ParamsType,
			values?: {
				[propsname: string]: any;
			}
		) => {
			running.current = true; // 设置为可以运行
			setLoading(true); // 加载中
			return proxy
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
					if (running.current) {
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
								values,
							});
						}
						return {
							running: true,
							data,
							params,
							Hint,
							values,
						};
					}
				})
				.catch((err: Error) => {
					/**
					 * 处理请求失败
					 */
					if (running.current) {
						setLoading(false);
						setError(err);
						if (options.onError) {
							options.onError({
								error: err,
								Hint,
							});
						}
						return {
							running: true,
							data,
							params,
							Hint,
							values,
						};
					}
				});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[options, source.token, url]
	);
	/**
	 * 停止请求，运行run也不会发送请求
	 */
	return {
		loading,
		data,
		error,
		run,
	};
}

export default useRequest;
