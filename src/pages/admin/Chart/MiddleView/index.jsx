import React from 'react';
import { Row, Col } from 'antd';
import Maintain from './Maintain';
import Subscribe from './Subscribe';
import Contract from './Contract';

const MiddleView = (props) => {
	return (
		<>
			<Row gutter={[0, 16]}>
				<Col span={24}>
					<Maintain />
				</Col>
				<Col span={24}>
					<Subscribe />
				</Col>
				<Col span={24}>
					<Contract />
				</Col>
			</Row>
		</>
	);
};

export default MiddleView;
