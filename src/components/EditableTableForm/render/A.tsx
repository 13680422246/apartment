import React, { memo } from 'react';

interface IPros {
	disable?: boolean;
	handleClick?: () => void;
	children: React.ReactNode;
}
const A: React.FC<IPros> = (props) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a
			href='#'
			onClick={(e) => {
				e.preventDefault();
				props.handleClick && props.handleClick();
			}}>
			{props.children}
		</a>
	);
};
export default memo(A);
