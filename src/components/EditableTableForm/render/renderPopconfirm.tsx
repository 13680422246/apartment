import React, { memo } from 'react';
import { Popconfirm } from 'antd';
import A from '../../A';
import useDispatch from '../store/dispatch';

export interface IActionPopconfirm {
	[propname: string]: any;
	popconfirm: {
		text: string;
		HintText: string;
		callback: (params: {
			id: string;
			setLoading: (bool: boolean) => void;
			setData: (data: any) => void;
			deleteData: (id: string) => void;
		}) => void;
	};
}

interface IProps {
	record: any;
	col: IActionPopconfirm;
}
const Delete: React.FC<IProps> = memo((props) => {
	const dispatch = useDispatch();
	const { popconfirm } = props.col;
	return (
		<Popconfirm
			title={popconfirm.HintText}
			onConfirm={() => {
				popconfirm.callback({
					id: props.record.id,
					setLoading: dispatch.setLoading,
					setData: dispatch.setData,
					deleteData: dispatch.deleteData,
				});
			}}>
			<span>
				<A disable={dispatch.getDisable()}>{popconfirm.text}</A>
			</span>
		</Popconfirm>
	);
});

const renderDelete = (text: string, record: any, col: any) => {
	// 编辑的时候不能删除
	return <Delete record={record} col={col} />;
};
export default renderDelete;
