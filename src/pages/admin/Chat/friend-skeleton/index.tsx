import React, { memo } from 'react';
import { Skeleton } from 'antd';

/**
 * 朋友列表的骨架屏
 */
const friendSkeleton: React.FC<{}> = () => {
	return (
		<div
			style={{
				marginBottom: '20px',
			}}>
			<Skeleton
				avatar
				active
				paragraph={{
					rows: 1,
				}}
			/>
		</div>
	);
};
export default memo(friendSkeleton);
