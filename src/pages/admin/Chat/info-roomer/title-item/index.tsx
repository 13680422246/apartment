import React, { memo } from 'react';
import { classNames } from '../../../../../js';
import style from './index.module.scss';

const cls = classNames.bind(style);

interface IPros {
	title: string;
}
const TitleItem: React.FC<IPros> = (props) => {
	return <div className={cls('title')}>{props.title}</div>;
};
export default memo(TitleItem);
