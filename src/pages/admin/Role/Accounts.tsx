import React, { memo } from 'react';
import { A } from '../../../components';
import { useToggle } from '../../../js';
import { Modal } from 'antd';
import { Tag } from '../../../components';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';

interface IPros {
	accounts: String[];
	record: any; // 该段角色的信息
}
/**
 * 组件描述: 角色页面显示该角色下的人数, open modal显示所有的用户名
 * 作者: 苏柏良
 * 时间: 2021-01-17
 */
const Accounts: React.FC<IPros> = (props) => {
	const { visible, toggle } = useToggle();
	const dispatch = useDispatch();

	const size = props.accounts.length;
	const { rolename } = props.record;
	return (
		<>
			<A
				disable={size === 0 || dispatch.getDisable()}
				handleClick={toggle}>
				{size}人
			</A>
			<Modal
				title={!!rolename ? rolename : '角色人数'}
				visible={visible}
				onCancel={toggle}
				footer={[]}>
				{props.accounts.map((name) => (
					<Tag closable={false}>{name}</Tag>
				))}
			</Modal>
		</>
	);
};
export default memo(Accounts);
