import React, { memo } from 'react';
import Filter from './filter';
import Rooms from './rooms';
import Tags from './tags';
import style from './index.module.scss';
import { classNames } from '../../../js';

interface IPros {}
const defaultProps: IPros = {};
const Content: React.FC<IPros> = (props) => {
	return (
		<>
			<Filter />
			<div className={classNames.call(style, 'content')}>
				<Tags />
				<Rooms />
			</div>
		</>
	);
};
Content.defaultProps = defaultProps;
export default memo(Content);
