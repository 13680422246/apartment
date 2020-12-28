import React, { memo } from 'react';
import Filter from './filter';
import Rooms from './rooms';
import Tags from './tags';

interface IPros {}
const defaultProps: IPros = {};
const Content: React.FC<IPros> = (props) => {
	return (
		<>
			<Filter />
			<div
				style={{
					marginTop: '110px',
				}}>
				<Tags />
				<Rooms />
			</div>
		</>
	);
};
Content.defaultProps = defaultProps;
export default memo(Content);
