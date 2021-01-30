import React, { memo, useCallback, useMemo } from 'react';
import { IFriend } from '../../useFriends';
import style from './index.module.scss';
import { classNames } from '../../../../../js';
import { A } from '../../../../../components';
import { Tooltip } from 'antd';

const cls = classNames.bind(style);

interface IPros {
	sendContent: (content: string) => void;
	user: IFriend;
}
const UserItem: React.FC<IPros> = (props) => {
	const hintUser2finishInfo = useCallback(() => {
		props.sendContent && props.sendContent(`请先完善信息`);
	}, [props]);
	/**
	 * 是否完善好用户信息
	 */
	const userInfoTip = useMemo(() => {
		if (props.user.isFinishInfo) {
			return <A disable={true}>是</A>;
		} else {
			return (
				<Tooltip title='点击提示用户'>
					<span>
						<A handleClick={hintUser2finishInfo}>否</A>
					</span>
				</Tooltip>
			);
		}
	}, [hintUser2finishInfo, props.user.isFinishInfo]);
	return (
		<>
			<div className={cls('user-info__item')}>
				<span>用户名</span>
				<span>{props.user.username}</span>
			</div>
			<div className={cls('user-info__item')}>
				<span>是否完善用户信息</span>
				{userInfoTip}
			</div>
		</>
	);
};
export default memo(UserItem);
