import React, { memo } from 'react';
import style from './index.module.scss';
import { classNames, useToggle } from '../../../../js';
import { Collapse, Button } from 'antd';
import TitleItem from './title-item'; // 标题item
import { IFriend } from '../useFriends'; // 朋友接口
import UserItem from './user-item'; // 用户信息item
import SubscribeItem from './subscribe-item'; // 预约信息item
import CheckInForm from './check-in-form'; // 入住表单

const { Panel } = Collapse;
const cls = classNames.bind(style);

interface IPros {
	sendContent: (content: string) => void;
	user: IFriend;
}
const InfoRoomer: React.FC<IPros> = (props) => {
	const { visible, toggle } = useToggle();
	return (
		<>
			<CheckInForm
				visible={visible}
				userid={props.user.userid}
				toggle={toggle}
			/>
			<Collapse defaultActiveKey={['1']}>
				<Panel header={<TitleItem title='用户信息' />} key='1'>
					<UserItem
						user={props.user}
						sendContent={props.sendContent}
					/>
				</Panel>
				<Panel header={<TitleItem title='预约信息' />} key='2'>
					<SubscribeItem userid={props.user.userid} />
				</Panel>
				<Panel header={<TitleItem title='合同信息' />} key='3'></Panel>
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
