import React, { memo } from 'react';
import { IFriend } from '../useFriends';
import style from './index.module.scss';
import { localeMoment } from '../../../../js';
import { Badge } from 'antd';

interface IPros {
	friend: IFriend;
	active: boolean;
}
const defaultProps = {
	active: false,
};

/**
 * 组件描述: 朋友列表的每个item
 * 作者: 苏柏良
 * 时间: 2021-01-16
 */
const friendItem: React.FC<IPros> = (props) => {
	const { friend } = props;
	return (
		<div className={`${style.friend} ${props.active ? style.active : ''}`}>
			<div className={style.header}>
				<span className={style.username}>{friend.username}</span>
				<span className={style.time}>
					{localeMoment(friend.lasttime).toNow()}
				</span>
			</div>
			<div className={style.footer}>
				<div className={style.content}>{friend.lastContent}</div>
				<Badge count={friend.unread} offset={[0, 0]}></Badge>
			</div>
		</div>
	);
};
friendItem.defaultProps = defaultProps;
export default memo(friendItem);
