/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import style from './A.module.scss';

interface IPros {
	disable?: boolean;
	handleClick?: () => void;
	children?: React.ReactNode;
}
const A: React.FC<IPros> = (props) => {
	return (
		<span onClick={props.handleClick}>
			<a
				href='#'
				className={props.disable === true ? style.disabled : ''}
				onClick={(e) => {
					e.preventDefault(); // 阻止默认事件
				}}>
				{props.children}
			</a>
		</span>
	);
};
A.defaultProps = {
	disable: false,
};
export default memo(A);
