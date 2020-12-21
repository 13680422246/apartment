import { Collapse } from 'antd';
import React, { memo, useRef } from 'react';
import { FilterSlider, Handle, Modal } from '../../../../components';
import {
	useRoomDispatch,
	useRoomStore,
} from '../../../../store/RoomReducer/dispatch';
import { areas, dirs, prices } from './data';
import Dir from './Dir';
import style from './style.module.scss';
import useTabKey from './useTabKey';
const { Panel } = Collapse;

const collapse: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-around',
	backgroundColor: 'white',
	position: 'absolute',
	left: 0,
	right: 0,
	zIndex: 200,
};

const Filter: React.FC<{}> = (props) => {
	const store = useRoomStore();
	const dispatch = useRoomDispatch();
	const { activeKey, close, handleChange: tabKeyChange } = useTabKey(); // 当前使用的tab
	const modalRef = useRef<Handle>(null);

	// open tab
	const handleChange = (key: string | string[]) => {
		if (!key) {
			colseTab();
		} else {
			modalRef.current?.showModal();
		}
		tabKeyChange(key);
	};
	// close tab - 重新请求数据
	const colseTab = () => {
		close(); // close tab
		modalRef.current?.closeModal(); // close modal
	};

	const handlePrice = (
		title: React.ReactNode,
		min: number | undefined,
		max: number | undefined
	) => {
		dispatch.setPrice({
			title,
			min,
			max,
		});
		colseTab();
	};
	const handleArea = (
		title: React.ReactNode,
		min: number | undefined,
		max: number | undefined
	) => {
		dispatch.setArea({
			title,
			min,
			max,
		});
		colseTab();
	};
	const handleDir = (item: string) => {
		dispatch.setDir(item);
		colseTab();
	};
	return (
		<>
			<Modal ref={modalRef} clickModal={colseTab} />
			<Collapse
				style={collapse}
				activeKey={activeKey}
				onChange={handleChange}
				accordion
				ghost>
				<Panel
					header={
						<span
							className={
								store.price.title === '租金'
									? ''
									: style.textSelect
							}>
							{store.price.title}
						</span>
					}
					key='1'>
					<FilterSlider
						min={0}
						max={prices[prices.length - 1].min as number}
						step={10}
						data={prices}
						squareUnit='元'
						callback={handlePrice}
					/>
				</Panel>
				<Panel
					header={
						<span
							className={
								store.area.title === '面积'
									? ''
									: style.textSelect
							}>
							{store.area.title}
						</span>
					}
					key='2'>
					<FilterSlider
						min={0}
						max={areas[areas.length - 1].min as number}
						step={10}
						data={areas}
						squareUnit={
							<span>
								m<sup>2</sup>
							</span>
						}
						callback={handleArea}
					/>
				</Panel>
				<Panel
					header={
						<span
							className={
								store.dir.title === '朝向'
									? ''
									: style.textSelect
							}>
							{store.dir.title}
						</span>
					}
					key='3'>
					<Dir data={dirs} handleClick={handleDir} />
				</Panel>
			</Collapse>
		</>
	);
};
export default memo(Filter);
