import React from 'react';
import { message } from 'antd';

const defaultStyle: React.CSSProperties = {
	marginTop: '15vh',
};

export interface HintOptions {
	type: 'info' | 'success' | 'error' | 'warning';
	content: string;
	style?: React.CSSProperties;
}
const Hint = (options: HintOptions) => {
	// 获取函数
	let func = Reflect.get(message, options.type);
	// 构建参数
	let params = {
		content: options.content,
		style: options.style === undefined ? defaultStyle : defaultStyle,
	};
	// 调用函数
	if (typeof func === 'function') {
		func(params);
	}
};
export default Hint;
