import React, { useRef, memo } from 'react';
import { Card, DatePicker } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
// 日期处理
import moment from 'moment';
// 日期选择器 + 本地化
const { RangePicker } = DatePicker;

const CommonCard: React.FC<{
	handleChange: (startTime: string, endTime: string) => void;
	loading: boolean;
	title: React.ReactNode;
	children: React.ReactNode;
}> = (props) => {
	const startTime = useRef<string>('');
	const endTime = useRef<string>('');
	const handleChange = (dates: any, strings: string[], info: any) => {
		if (info.range === 'start') {
			startTime.current = strings[0];
		} else {
			endTime.current = strings[1];
		}
	};
	const handleOpenChange = (flag: boolean) => {
		if (flag === false) {
			props.handleChange(startTime.current, endTime.current);
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
export default memo(CommonCard);
