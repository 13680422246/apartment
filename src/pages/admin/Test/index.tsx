import React, { memo } from 'react';
import { Button, Space } from 'antd';
import style from './index.module.scss';
import { useRequest, useTitle } from '../../../utils';
import { HintOptions } from '../../../components';

interface IPros {}
const handleSuccess = (content: string) => ({
	Hint,
}: {
	Hint: (options: HintOptions) => void;
}) => {
	Hint({
		type: 'success',
		content: content,
	});
};
const Test: React.FC<IPros> = (props) => {
	useTitle('测试功能');

	// 预约提醒
	const fireSubscribeJob = useRequest('/admin/test/fireSubscribeJob', {
		onSuccess: handleSuccess('触发预约提醒成功'),
	});
	// 合同到期提醒
	const fireContractJob = useRequest('/admin/test/fireContractJob', {
		onSuccess: handleSuccess('触发合同到期提醒成功'),
	});
	// 释放占用房间提醒
	const fireReleaseRoomJob = useRequest('/admin/test/fireReleaseRoomJob', {
		onSuccess: handleSuccess('释放房间成功'),
	});
	// 预约超时提醒
	const fireMissSubscribeJob = useRequest(
		'/admin/test/fireMissSubscribeJob',
		{
			onSuccess: handleSuccess('预约超时处理成功'),
		}
	);
	return (
		<div className={style.container}>
			<Space direction='vertical'>
				<Button
					loading={fireSubscribeJob.loading}
					type='primary'
					block
					onClick={() => {
						fireSubscribeJob.run({});
					}}>
					手动触发预约提醒
				</Button>
				<Button
					loading={fireMissSubscribeJob.loading}
					type='primary'
					block
					onClick={() => {
						fireMissSubscribeJob.run({});
					}}>
					手动触发预约超时处理
				</Button>
				<Button
					loading={fireContractJob.loading}
					type='primary'
					block
					onClick={() => {
						fireContractJob.run({});
					}}>
					手动触发合同到期提醒
				</Button>
				<Button
					loading={fireReleaseRoomJob.loading}
					type='primary'
					block
					onClick={() => {
						fireReleaseRoomJob.run({});
					}}>
					手动触发释放房间
				</Button>
			</Space>
		</div>
	);
};
export default memo(Test);
