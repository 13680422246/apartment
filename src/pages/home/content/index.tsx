import React, { memo } from 'react';
import Filter from './filter';

interface IPros {}
const defaultProps: IPros = {};
const Content: React.FC<IPros> = (props) => {
	return (
		<>
			<Filter />
		</>
	);
};
Content.defaultProps = defaultProps;
export default memo(Content);
