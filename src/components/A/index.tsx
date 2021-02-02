import React, { memo } from 'react';
import style from './A.module.scss';
import classNames from '../../js/classNames';

const cls = classNames.bind(style);

interface IPros {
	disable?: boolean;
	handleClick?: () => void;
	children?: React.ReactNode;
}
/**
 * 模拟A标签的样式
 */
const A: React.FC<IPros> = (props) => {
	return (
		<span onClick={props.handleClick}>
			{/* 模拟a标签 */}
			<span
				className={cls(
					props.disable === true ? 'a--disabled' : 'a--active'
				)}>
				{props.children}
			</span>
		</span>
	);
};
A.defaultProps = {
	disable: false,
};
export default memo(A);
