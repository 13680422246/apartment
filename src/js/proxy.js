import Axios from 'axios';
import Qs from 'qs';
import { store } from '../store';
import Hint from '../components/Hint';

// 基础配置
const baseURL = 'http://localhost:8080';

// 构建Axios代理
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

export const POST = (url, params, callback, errorCallback) => {
	const source = Axios.CancelToken.source();
	proxy
		.post(url, params, {
			cancelToken: source.token,
		})
		.catch((err) => {
			if (Axios.isCancel(err)) {
				console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
			} else {
				//handle error
				console.log(err);
			}
		})
		.then((res) => {
			return res.data;
		})
		.then((data) => {
			if (data.type === 'error') {
				if (data.msg !== '') {
					// error(data.msg);
					Hint({
						type: 'error',
						content: data.msg,
					});
				}
				typeof errorCallback == 'function' && errorCallback(data); // 错误的回到函数
			} else {
				typeof callback == 'function' && callback(data); // 成功的回调函数
			}
		});
	return source.cancel;
};

// 添加房间信息
// 修改房间信息
export const POSTROOM = (url, row, callback, errorCallback) => {
	const fd = new FormData();
	// 1.添加字段
	for (const [key, value] of Object.entries(row)) {
		// 图片文件
		if (key === 'upload' && Array.isArray(value) && value.length !== 0) {
			value.forEach((file) => {
				fd.append('upload', file.originFileObj);
			});
		}
		// 其他信息
		else {
			fd.append(key, value);
		}
	}
	// 2.token
	const token = store.getState().user.token;
	fd.append('token', token);
	// 3.其他数据
	Axios.post(`${baseURL}${url}`, fd, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => {
			return res.data;
		})
		.then((data) => {
			if (data.type === 'error') {
				// error(data.msg);
				Hint({
					type: 'error',
					content: data.msg,
				});
				typeof errorCallback == 'function' && errorCallback(data); // 错误的回到函数
			} else {
				typeof callback == 'function' && callback(data); // 成功的回调函数
			}
		});
};
export default proxy;
