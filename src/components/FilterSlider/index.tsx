import React, { memo, useState } from 'react';
import style from './style.module.scss';
import { List, Slider, Button } from 'antd';
export interface MinAndMax {
	min?: number;
	max?: number;
}
interface IPros {
	min: number; // 最小值
	max: number; // 最大值
	step: number; // 步长
	squareUnit: React.ReactNode; // 单位
	data: MinAndMax[]; // 数据源
	callback: (
		title: React.ReactNode,
		min: number | undefined,
		max: number | undefined
	) => void; // 选择完毕后的回调函数
}
const defaultProps = {
	min: 0,
	max: 100,
};
const FilterSlider: React.FC<IPros> = (props) => {
	const [hitText, setHintText] = useState<React.ReactNode>('不限'); // 显示文本
	const [range, setRange] = useState<(number | undefined)[]>([
		props.min,
		props.max,
	]); // 选择区间
	const [currentMin, setCurrentMin] = useState<number | undefined>(undefined);
	const [currentMax, setCurrentMax] = useState<number | undefined>(undefined);

	// 监听Slider
	const handleChange = (value: [number, number]) => {
		const { min, max, squareUnit } = props;
		if (value[0] === min && value[1] === max) {
			setHintText('不限');
			setRange([undefined, undefined]);
		} else if (value[0] !== min && value[1] === max) {
			setHintText(
				<span>
					{value[0]}
					{squareUnit}以上
				</span>
			);
			setRange([value[0], undefined]);
		} else if (value[0] === min && value[1] !== max) {
			setHintText(
				<span>
					{value[1]}
					{squareUnit}以下
				</span>
			);
			setRange(value);
		} else {
			setHintText(
				<span>
					{value[0]}
					{squareUnit}-{value[1]}
					{squareUnit}
				</span>
			);
			setRange(value);
		}
	};
	// 点击选择区间
	const clickRange = (min: number, max: number) => {
		const { squareUnit } = props;
		let title: React.ReactNode = '';
		// 不限
		if (min === undefined && max === undefined) {
			title = '不限';
		}
		// 600元以下
		else if (min === undefined && max !== undefined) {
			title = (
				<span>
					{max}
					{squareUnit}以下
				</span>
			);
		}
		// 800元以上
		else if (min !== undefined && max === undefined) {
			title = (
				<span>
					{min}
					{squareUnit}以上
				</span>
			);
		}
		// 区间
		else {
			title = (
				<span>
					{min}
					{squareUnit}-{max}
					{squareUnit}
				</span>
			);
		}
		// 调用回调函数
		setCurrentMin(min);
		setCurrentMax(max);
		props.callback(title, min, max);
	};
	// 点击确认按钮
	const handleSlider = () => {
		if (range[0] === props.min) {
			setCurrentMin(undefined);
		} else {
			setCurrentMin(range[0]);
		}
		if (range[1] === props.max) {
			setCurrentMax(undefined);
		} else {
			setCurrentMax(range[1]);
		}
		props.callback(hitText, range[0], range[1]);
	};
	return (
		<div className={style.container}>
			<List
				className={style.list}
				split={false}
				dataSource={props.data}
				renderItem={(item) => {
					const { squareUnit } = props;
					const { min, max } = item;
					let Node = null;
					// 不限
					if (!min && !max) {
						Node = (
							<div
								className={`${
									currentMin === undefined &&
									currentMax === undefined
										? style.textSelect
										: ''
								}`}>
								不限
							</div>
						);
					}
					// 区间
					else if (!!min && !!max) {
						Node = (
							<div
								className={`${
									currentMin === min && currentMax === max
										? style.textSelect
										: ''
								}`}>
								{min}
								{squareUnit}-{max}
								{squareUnit}
							</div>
						);
					}
					// xxx以下
					else if (!min && !!max) {
						Node = (
							<div
								className={`${
									currentMin === undefined &&
									currentMax === max
										? style.textSelect
										: ''
								}`}>
								{max}
								{squareUnit}以下
							</div>
						);
					}
					// xxx以上
					else {
						Node = (
							<div
								className={`${
									currentMin === min &&
									currentMax === undefined
										? style.textSelect
										: ''
								}`}>
								{min}
								{squareUnit}以上
							</div>
						);
					}
					return (
						<List.Item
							onClick={() => {
								clickRange(min as number, max as number);
							}}
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}>
							{Node}
						</List.Item>
					);
				}}></List>
			<div className={style.bottom}>
				<div className={style.textSelect}>{hitText}</div>
				<Slider
					range
					defaultValue={[props.min, props.max]}
					step={props.step}
					min={props.min}
					max={props.max}
					onChange={handleChange}
				/>
				<Button block onClick={handleSlider}>
					确定
				</Button>
			</div>
		</div>
	);
};
FilterSlider.defaultProps = defaultProps;
export default memo(FilterSlider);
