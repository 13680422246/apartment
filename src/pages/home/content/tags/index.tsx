import React, { memo } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import style from './index.module.scss';
import {
	useTags,
	useRoomDispatch,
} from '../../../../store/RoomReducer/dispatch';
import { Tag } from '../../../../components';

interface IPros {}
const Tags: React.FC<IPros> = (props) => {
	const dispatch = useRoomDispatch();
	// 从store中获取tags
	const tags = useTags();
	// 从tags中删除tag
	const handleClose = (tag: string) => {
		dispatch.deleteTag(tag);
	};
	const tagChild = tags.map((tag, index) => {
		return (
			<span key={index} style={{ display: 'inline-block' }}>
				<Tag
					onClick={() => {
						handleClose(tag.tag);
					}}>
					{tag.value}
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
