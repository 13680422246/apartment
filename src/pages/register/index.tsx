import React, { memo, useCallback } from 'react';
import RegisterUI from './RegisterUI';

interface PostData {
	username: string;
	pwd: string;
	captcha: string;
	againpwd?: string;
}
const Login: React.FC = () => {
	const requestRegister = useCallback((values: PostData) => {
		delete values.againpwd;
		console.info(values);
	}, []);
	return <RegisterUI requestRegister={requestRegister} />;
};
export default memo(Login);
