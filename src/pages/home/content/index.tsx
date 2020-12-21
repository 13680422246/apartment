import React, { memo } from 'react';
import Filter from './filter';
import Rooms from './rooms';

interface IPros {}
const defaultProps: IPros = {};
const Content: React.FC<IPros> = (props) => {
	return (
		<>
			<Filter />
			<Rooms />
		</>
	);
};
Content.defaultProps = defaultProps;
export default memo(Content);
