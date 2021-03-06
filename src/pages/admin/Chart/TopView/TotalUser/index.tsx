import React, { useContext, useRef } from 'react';
import CommonCard from '../components/CommonCard';
import { TopViewProvider } from '../index';
import { useChart } from '../../../../../js';

const TotalUser: React.FC<{}> = (props) => {
	const chartDom = useRef<HTMLDivElement>(null); // 图表的ref对象
	const values = useContext(TopViewProvider); // 服务提供者

	/**
	 * 渲染图表
	 */
	useChart(
		chartDom,
		{
			xAxis: {
				type: 'category',
				show: false,
				// 默认X轴俩侧有间距
				boundaryGap: false,
			},
			yAxis: {
				show: false,
				splitLine: {
					show: false,
				},
			},
			// 拉伸图表
			grid: {
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
			},
			series: [
				{
					type: 'line',
					data: values.data === undefined ? [] : values.data.userData,
					// 区域面积
					areaStyle: {
						color: 'purple',
					},
					// 隐藏线
					lineStyle: {
						width: 0,
					},
					// 平滑显示
					smooth: true,
					// 隐藏item
					itemStyle: {
						opacity: 0,
					},
				},
			],
		},
		[values.data]
	);

	const { data } = values;
	return (
		<CommonCard
			loading={values.loading}
			title='注册用户数'
			value={data === undefined ? '' : String(data.userNum)}
			chart={
				<div
					ref={chartDom}
					style={{
						height: '100%',
					}}></div>
			}
			footer={
				<div>
					<span>今日新增人数</span>
					<span
						style={{
							marginLeft: '10px',
						}}>
						{data === undefined ? '' : data.todayUserNum}
					</span>
				</div>
			}
		/>
	);
};

export default TotalUser;
