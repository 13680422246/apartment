import React, { memo, useCallback } from 'react';
import LoginUI from './LoginUI';

interface PostData {
	username: string;
	pwd: string;
	captcha: string;
}
const Login: React.FC = () => {
	const requestLogin = useCallback((values: PostData) => {
		console.info(`登录ing`);
		console.info(values.username);
		console.info(values.pwd);
		console.info(values.captcha);
	}, []);
	return <LoginUI requestLogin={requestLogin} />;
};
export default memo(Login);
