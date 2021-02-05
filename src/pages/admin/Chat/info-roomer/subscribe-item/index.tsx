import React, { memo, useCallback } from 'react';
import useUserSub from './useUserSub';
import { Skeleton, Button } from 'antd';
import moment from 'moment';
import style from './index.module.scss';
import { classNames } from '../../../../../js';
import useCancelSub from './useCancelSub';

const cls = classNames.bind(style);

interface IPros {
	userid: number;
}
const SubscribeItem: React.FC<IPros> = (props) => {
	const { loading, data } = useUserSub(props.userid);
	const { cancel, cancelLoading } = useCancelSub();

	/**
	 * 取消预约
	 */
	const handleCancelSubscribe = useCallback(
		(item: any) => {
			cancel({
				roomid: item.roomid,
				userid: item.userid,
			});
		},
		[cancel]
	);

	if (loading) {
		return <Skeleton active loading={true} />;
	}
	if (!!data && data.type === 'error') {
		return <div>{data.msg}</div>;
	}
	const list = (data && data.list) || []; // 预约房间的列表
	return (
		<>
			<div className={cls('header')}>
				<span>一共预定的房间数量:</span>
				<span>{list.length}</span>
			</div>
			<hr />
			<div className={cls('main')}>
				{list.map((item: any, index: number) => (
					<div key={item.id}>
						<div>
							<div className={cls('main__item')}>
								<span>房间id:</span>
								<span>{item.roomid}</span>
							</div>
							<div className={cls('main__item')}>
								<span>预约入住时间:</span>
								<span>
									{moment(item.checkintime).format(
										'YYYY-MM-DD'
									)}
								</span>
							</div>
							<div className={cls('main__item')}>
								<span>订单创建时间:</span>
								<span>
									{moment(item.createtime).format(
										'YYYY-MM-DD'
									)}
								</span>
							</div>
							<div
								className={cls('main__item')}
								hidden={!item.mark}>
								<span>备注:</span>
								<span>{item.remark}</span>
							</div>
							<Button
								block
								loading={cancelLoading}
								onClick={() => {
									handleCancelSubscribe(item);
								}}>
								取消预约订单
							</Button>
						</div>
						<hr hidden={index === list.length - 1} />
					</div>
				))}
			</div>
		</>
	);
};
export default memo(SubscribeItem);
