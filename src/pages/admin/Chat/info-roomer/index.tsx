import React, { memo, useCallback, useState } from 'react';
import style from './index.module.scss';
import { classNames, useToggle } from '../../../../js';
import { Collapse, Button } from 'antd';
import TitleItem from './title-item'; // 标题item
import { IFriend } from '../useFriends'; // 朋友接口
import UserItem from './user-item'; // 用户信息item
import SubscribeItem from './subscribe-item'; // 预约信息item
import CheckInForm from './check-in-form'; // 入住表单
import ContractItem from './contract-item'; // 合同表单

const { Panel } = Collapse;
const cls = classNames.bind(style);

interface IPros {
	sendContent: (content: string) => void;
	user: IFriend;
}
const InfoRoomer: React.FC<IPros> = (props) => {
	const { visible, toggle } = useToggle();
	// const [subscribeKey, setSubscribeKey] = useState(0);
	// const [contractKey, setContractKey] = useState(0);
	// // TODO: 每次打开Panel的时候都去重新发起一次请求

	// const handleChange = useCallback((keys: string | string[]) => {
	// 	if (Array.isArray(keys)) {
	// 		// 点开预约表单
	// 		if (keys.includes('2')) {
	// 			setSubscribeKey(Math.random()); // 通过key强制刷新组件
	// 		}
	// 		// 点开合同表单
	// 		if (keys.includes('3')) {
	// 			setContractKey(Math.random());
	// 		}
	// 	}
	// }, []);
	return (
		<>
			<CheckInForm
				visible={visible}
				userid={props.user.userid}
				toggle={toggle}
			/>
			<Collapse destroyInactivePanel={true} defaultActiveKey={['1']}>
				<Panel header={<TitleItem title='用户信息' />} key='1'>
					<UserItem
						user={props.user}
						sendContent={props.sendContent}
					/>
				</Panel>
				<Panel header={<TitleItem title='预约信息' />} key='2'>
					<SubscribeItem userid={props.user.userid} />
				</Panel>
				<Panel header={<TitleItem title='合同信息' />} key='3'>
					<ContractItem userid={props.user.userid} />
				</Panel>
				<Panel header={<TitleItem title='操作' />} key='4'>
					<div className={cls('operator')}>
						<Button
							onClick={toggle}
							className={cls('operator--button')}
							block>
							预约房间
						</Button>
					</div>
				</Panel>
			</Collapse>
		</>
	);
};
export default memo(InfoRoomer);
