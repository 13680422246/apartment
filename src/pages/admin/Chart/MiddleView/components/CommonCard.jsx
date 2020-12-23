import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, DatePicker } from 'antd';
// 日期选择器 + 本地化
const { RangePicker } = DatePicker;
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
// 日期处理
import moment from 'moment';

const CommonCard = (props) => {
	const startTime = useRef();
	const endTime = useRef();
	const handleChange = (dates, strings, info) => {
		if (info.range == 'start') {
			startTime.current = strings[0];
		} else {
			endTime.current = strings[1];
		}
	};
	const handleOpenChange = (flag) => {
		if (flag == false) {
			const { handleChange } = props;
			typeof handleChange == 'function' &&
				handleChange(startTime.current, endTime.current);
		}
	};

	return (
		<Card
			loading={props.loading}
			hoverable={true}
			title={props.title}
			extra={
				<RangePicker
					allowClear={false}
					locale={locale}
					picker='month'
					defaultValue={[
						moment(`${new Date().getFullYear()}-01`),
						moment(`${new Date().getFullYear()}-12`),
					]}
					// 日期改变的回调
					onCalendarChange={handleChange}
					onOpenChange={handleOpenChange}
				/>
			}>
			<div
				style={{
					height: '300px',
				}}>
				{props.children}
			</div>
		</Card>
	);
};
CommonCard.propTypes = {
	loading: PropTypes.bool,
	title: PropTypes.string.isRequired,
	handleChange: PropTypes.func,
};

export default CommonCard;
