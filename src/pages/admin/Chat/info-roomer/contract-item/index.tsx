import React, { memo } from 'react';
import { classNames } from '../../../../../js';
import style from './index.module.scss';
import moment from 'moment';
import { Skeleton } from 'antd';
import useUserCon from './useUserCon';

const cls = classNames.bind(style);

interface IPros {
	userid: number;
}
const ContractItem: React.FC<IPros> = (props) => {
	const { loading, data } = useUserCon(props.userid);
	if (loading) {
		return <Skeleton active loading={true} />;
	}
	if (!!data && data.type === 'error') {
		return <div>{data.msg}</div>;
	}
	const list = (data && data.list) || []; // 合同信息
	return (
		<>
			<div className={cls('header')}>
				<span>一共签订的合同数量:</span>
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
								<span>订单创建时间:</span>
								<span>
									{moment(item.createtime).format(
										'YYYY-MM-DD'
									)}
								</span>
							</div>
							<div className={cls('main__item')}>
								<span>剩余月份:</span>
								<span>{item.durationtime}月以内</span>
							</div>
							<div hidden={!item.remark}>
								<span>备注:</span>
								<div className={cls('remark')}>
									{item.remark}
								</div>
							</div>
						</div>
						<hr hidden={index === list.length - 1} />
					</div>
				))}
			</div>
		</>
	);
};
export default memo(ContractItem);
