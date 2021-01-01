import React, { memo } from 'react';
import TopView from './TopView';
import MiddleView from './MiddleView';
import Report from './Report';
import { useTitle } from '../../../utils';

interface IPros {}
const Chart: React.FC<IPros> = (props) => {
	useTitle('经营分析');

	return (
		<div
			style={{
				padding: '20px',
			}}>
			<TopView />
			<Report />
			<MiddleView />
		</div>
	);
};
export default memo(Chart);
