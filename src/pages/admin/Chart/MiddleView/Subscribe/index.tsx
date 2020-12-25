import React, { useState, useRef, useEffect } from 'react';
import CommonCard from '../components/CommonCard';
import { useChart, useRequest } from '../../../../../utils';
import moment from 'moment';

const Subscribe = () => {
	const chartDom = useRef<HTMLDivElement>(null);
	const [xAxis, setXAxis] = useState<string[]>([]);
	const [success, setSuccess] = useState<string[]>([]);
	const [cancel, setCancel] = useState<string[]>([]);
	const [miss, setMiss] = useState<string[]>([]);

	/**
	 * 图表展示
	 */
	useChart(
		chartDom,
		{
			title: {
				text: '预约订单数据',
				textStyle: {
					fontSize: 12,
					color: '#666',
				},
				left: 25,
			},
			xAxis: {
				type: 'category',
			},
			yAxis: {
				splitLine: {
					lineStyle: {
						type: 'dotted',
						color: '#eee',
					},
				},
			},
			toolbox: {
				feature: {
					dataZoom: {}, // 缩放与还原
					restore: {}, // 刷新
					saveAsImage: {}, // 保存为图片
				},
			},
			dataset: {
				dimensions: ['月份', '成功入住', '客户取消', '超时取消'],
				source: [
					['月份', ...xAxis],
					['成功入住', ...success],
					['客户取消', ...cancel],
					['超时取消', ...miss],
				],
			},
			legend: {},
			series: [
				{
					type: 'bar',
					barWidth: '25%',
					seriesLayoutBy: 'row',
				},
				{
					type: 'bar',
					barWidth: '25%',
					seriesLayoutBy: 'row',
				},
				{
					type: 'bar',
					barWidth: '25%',
					seriesLayoutBy: 'row',
				},
			],
			color: ['#3398DB', 'red', 'green'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter: function (params: any) {
					var tar1 = params[0];
					var tar2 = params[1];
					var tar3 = params[2];
					return (
						tar1.name +
						'<br/>' +
						tar1.seriesName +
						' : ' +
						tar1.value[parseInt(tar1.seriesIndex) + 1] +
						'<br/>' +
						tar2.seriesName +
						' : ' +
						tar2.value[parseInt(tar2.seriesIndex) + 1] +
						'<br/>' +
						tar3.seriesName +
						' : ' +
						tar3.value[parseInt(tar3.seriesIndex) + 1]
					);
				},
			},
		},
		[success, cancel, miss]
	);

	/**
	 * 加载数据
	 */
	interface ResDataType {
		date: string;
		num: string;
	}
	const { loading, run } = useRequest<
		{
			success: ResDataType[];
			cancel: ResDataType[];
			miss: ResDataType[];
		},
		{
			startTime: String;
			endTime: String;
		}
	>('/admin/chart/findSubscribe', {
		onSuccess: ({ data }) => {
			const newData: {
				[propname: string]: {
					success?: string;
					cancel?: string;
					miss?: string;
				};
			} = {};
			for (const item of data.success) {
				if (newData[item.date] === undefined) newData[item.date] = {};
				newData[item.date]['success'] = item.num;
			}
			for (const item of data.cancel) {
				if (newData[item.date] === undefined) newData[item.date] = {};
				newData[item.date]['cancel'] = item.num;
			}
			for (const item of data.miss) {
				if (newData[item.date] === undefined) newData[item.date] = {};
				newData[item.date]['miss'] = item.num;
			}
			const success: string[] = [];
			const cancel: string[] = [];
			const miss: string[] = [];
			for (const item of Object.values(newData)) {
				if (item.success) success.push(item.success);
				else success.push('0');
				if (item.cancel) cancel.push(item.cancel);
				else cancel.push('0');
				if (item.miss) miss.push(item.miss);
				else miss.push('0');
			}
			setXAxis(Object.keys(newData));
			setSuccess(success);
			setCancel(cancel);
			setMiss(miss);
		},
	});

	// 第一次加载数据
	useEffect(() => {
		const year = moment(new Date()).format('YYYY');
		run({
			startTime: `${year}-01`,
			endTime: `${year}-12`,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 处理日期的改变
	const handleChange = (startTime: string, endTime: string) => {
		run({
			startTime,
			endTime,
		});
	};
	return (
		<CommonCard
			loading={loading}
			title='预约订单详情'
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

export default Subscribe;
