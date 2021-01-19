import React, { memo, useCallback, useMemo } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useToggle, classNames } from '../../js';
import { Space } from 'antd';
import style from './index.module.scss';

interface IPros {
	text?: string;
}
const defaultProps = {};
/**
 * 组件描述: 隐藏敏感的字段
 * 作者: 苏柏良
 * 时间: 2021-01-18
 */
const HiddenField: React.FC<IPros> = (props) => {
	const { visible, toggle } = useToggle();
	/**
	 * 点击切换隐藏与显示
	 */
	const handleClick = useCallback(() => {
		toggle();
	}, [toggle]);

	/**
	 * 生成显示文本
	 */
	const showText = useMemo(() => {
		if (visible) return props.text;
		else return '.'.repeat(!!props.text ? props.text.length : 0);
	}, [props.text, visible]);

	/**
	 * 如果文本为空，则什么都不显示
	 */
	if (!showText) return null;

	return (
		<Space>
			<span
				className={classNames.call(style, {
					'text--hidden': !visible,
				})}>
				{showText}
			</span>
			<span
				className={classNames.call(style, 'icon')}
				onClick={handleClick}>
				{visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
			</span>
		</Space>
	);
};
HiddenField.defaultProps = defaultProps;
export default memo(HiddenField);
