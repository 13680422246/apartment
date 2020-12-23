import React, { useState, useRef, useEffect } from 'react';
import CommonCard from '../components/CommonCard';
import { useChart } from '@/utils/hooks';
import { POST } from '@/utils/proxy';
import moment from 'moment';

const Maintain = () => {
	const chartDom = useRef();
	const [loading, setLoading] = useState(false);
	const [xAxis, setXAxis] = useState([]);
	const [data, setData] = useState([]);

	useChart(
		chartDom,
		{
			title: {
				text: '维修支出',
				textStyle: {
					fontSize: 12,
					color: '#666',
				},
				left: 25,
			},
			xAxis: {
				type: 'category',
				data: xAxis,
			},
			yAxis: {
				splitLine: {
					lineStyle: {
						type: 'dotted',
						color: '#eee',
					},
				},
			},
			series: [
				{
					name: '维修费用',
					type: 'bar',
					barWidth: '35%',
					data: data,
				},
			],
			toolbox: {
				feature: {
					dataZoom: {}, // 缩放与还原
					restore: {}, // 刷新
					saveAsImage: {}, // 保存为图片
				},
			},
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter: function (params) {
					var tar = params[0];
					return (
						tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
					);
				},
			},
		},
		[data]
	);

	// 第一次加载数据
	useEffect(() => {
		const year = moment(new Date()).format('YYYY');
		fetch(`${year}-01`, `${year}-12`);
	}, []);

	// 请求数据
	const fetch = (startTime, endTime) => {
		setLoading(true);
		POST(
			'/admin/chart/findMaintain',
			{
				startTime,
				endTime,
			},
			(data) => {
				// eg. item: {date: '2020-12',price: 150}
				const newData = {};
				for (const item of data) {
					newData[item.date] = item.price;
				}
				setLoading(false);
				setXAxis(Object.keys(newData));
				setData(Object.values(newData));
			}
		);
	};

	// 处理日期的改变
	const handleChange = (startTime, endTime) => {
		fetch(startTime, endTime);
	};
	return (
		<CommonCard
			loading={loading}
			title='维修详情'
			handleChange={handleChange}>
			<div
				ref={chartDom}
				style={{
					width: '100%',
					height: '100%',
				}}></div>
		</CommonCard>
	);
};

export default Maintain;
