/**
 * 刷新验证码
 */
import { useState, useCallback } from 'react';
import { baseURL } from '../../config';

// 获取验证码路径
const getCheckCodeURL = () => {
	return `${baseURL}/captcha?random=${Math.random()}`;
};

function useCheckCodeURL() {
	const [captcha, setCaptcha] = useState(getCheckCodeURL());
	// 刷新验证码
	const refreshCheckCode = useCallback(() => {
		setCaptcha(getCheckCodeURL());
	}, []);
	return {
		captcha,
		refreshCheckCode,
	};
}
export default useCheckCodeURL;
