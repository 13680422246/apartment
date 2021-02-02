import React, { memo, useCallback } from 'react';
import { Popconfirm } from 'antd';
import { A } from '../../../components';
import { useRequest } from '../../../js';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import moment from 'moment';

interface IPros {
	record: any;
}
/**
 * 退租操作
 */
const Exit: React.FC<IPros> = (props) => {
	const dispatch = useDispatch();

	/**
	 * 提交退租请求
	 */
	const { run } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			contractid: number;
		}
	>('/admin/contract/exit', {
		onSuccess: ({ Hint, data }) => {
			Hint({
				type: data.type,
				content: data.type === 'error' ? data.msg : '退租成功',
			});
		},
	});

	/**
	 * 点击退租
	 */
	const handleOk = useCallback(() => {
		dispatch.setLoading(true);
		run({
			contractid: props.record.id,
		}).then((res) => {
			console.info(res);
			if (res && res.running) {
				// 处理数据
				if (res.data && res.data.type === 'success') {
					dispatch.setData((datasource) => {
						console.info(`处理数据`); // 不知道为什么返回的是undefined
						const newData = [...datasource];
						const index = newData.findIndex(
							(item) => item.id === props.record.id
						);
						if (index !== -1) {
							newData[index].durationtime =
								props.record.durationtime;
							newData[index].remaintime = props.record.remaintime;
							newData[index].reamrk = `${moment(
								new Date()
							).format('YYYY-MM-DD')}退租`;
						}
						return newData;
					});
				}
				console.info(`loading is false`);
				dispatch.setLoading(false);
			}
		});
	}, [
		dispatch,
		props.record.durationtime,
		props.record.id,
		props.record.remaintime,
		run,
	]);

	const { remaintime } = props.record;
	return (
		<Popconfirm
			disabled={remaintime === 0 || remaintime === 1}
			title='确定退租?'
			onConfirm={() => handleOk()}>
			<span>
				<A disable={remaintime === 0 || remaintime === 1}>退租</A>
			</span>
		</Popconfirm>
	);
};
export default memo(Exit);
