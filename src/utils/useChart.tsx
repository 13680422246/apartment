import React, { useEffect } from 'react';
import { EChartsOption } from 'echarts';
const echarts = require('echarts');

function useChart(
	dom: string | React.RefObject<HTMLElement>,
	options: EChartsOption,
	deps: any[] = []
) {
	useEffect(() => {
		let chartDom = null;
		if (typeof dom == 'string') {
			chartDom = document.getElementById(dom);
		} else {
			chartDom = dom.current;
		}
		let chart: any = null;
		if (!!chartDom) {
			chart = echarts.init(chartDom);
			chart.setOption(options);
		}
		// resize - 自适应
		const updateChart = () => {
			if (!!chart) {
				chart.resize();
			}
		};
		window.addEventListener('resize', updateChart);
		return () => {
			window.addEventListener('resize', updateChart);
			// 销毁实例
			chart && chart.dispose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);
}
export default useChart;
