import React, { memo } from 'react';
import { Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import style from './index.module.scss';
import { useTags } from '../../../../store/RoomReducer/dispatch';

interface IPros {}
const Tags: React.FC<IPros> = (props) => {
	const tags = useTags();
	// 从tags中删除tag
	const handleClose = (index: number) => {};
	const tagChild = tags.map((tag, index) => {
		return (
			<span key={index} style={{ display: 'inline-block' }}>
				<Tag
					className={style.tag}
					closable
					onClose={(e) => {
						e.preventDefault();
						handleClose(index);
					}}>
					{tag}
				</Tag>
			</span>
		);
	});

	return (
		<div className={style.container}>
			<TweenOneGroup
				enter={{
					scale: 0.8,
					opacity: 0,
					type: 'from',
					duration: 100,
					onComplete: (e: any) => {
						e.target.style = '';
					},
				}}
				leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
				appear={false}>
				{tagChild}
			</TweenOneGroup>
		</div>
	);
};
export default memo(Tags);
