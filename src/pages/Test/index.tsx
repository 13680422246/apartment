import React, { memo } from 'react';
import A from '../../components/EditableTableForm/render/A';

const Test: React.FC<{}> = (props) => {
	const handleClick = () => {
		console.info(`parent`);
	};
	return (
		<div onClick={handleClick}>
			this is parent
			<A disable={true}>child</A>
		</div>
	);
};

// const Child: React.FC<{}> = (props) => {
// 	const handleClick = () => {
// 		console.info(`child`);
// 	};
// 	return (
// 		// eslint-disable-next-line jsx-a11y/anchor-is-valid
// 		<a
// 			href='#'
// 			onClick={(e) => {
// 				e.preventDefault();
// 				handleClick();
// 			}}>
// 			child
// 		</a>
// 	);
// };

export default memo(Test);
