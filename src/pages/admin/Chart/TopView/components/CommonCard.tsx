import React from 'react';
import { Card } from 'antd';
import style from './CommonCard.module.scss';

const CommonCard: React.FC<{
	loading: boolean;
	title: React.ReactNode;
	value: React.ReactNode;
	chart: React.ReactNode;
	footer: React.ReactNode;
}> = (props) => {
	return (
		<Card loading={props.loading} hoverable={true}>
			<div className={style.title}>{props.title}</div>
			<div className={style.value}>{props.value}</div>
			<div className={style.chart}>{props.chart}</div>
			<div className={style.line}></div>
			<div className={style.footer}>{props.footer}</div>
		</Card>
	);
};
export default CommonCard;
