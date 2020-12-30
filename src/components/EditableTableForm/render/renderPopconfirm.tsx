import React, { memo } from 'react';
import { Popconfirm } from 'antd';
import A from '../../A';
import { useSelector } from '../store';
import useDispatch from '../store/dispatch';

export interface IActionPopconfirm {
	[propname: string]: any;
	popconfirm: {
		text: string;
		HintText: string;
		callback: (params: {
			record: any;
			setLoading: (bool: boolean) => void;
			setData: (data: any) => void;
			data: any[];
		}) => void;
	};
}

interface IProps {
	record: any;
	col: IActionPopconfirm;
}
const Delete: React.FC<IProps> = memo((props) => {
	const dispatch = useDispatch();
	const state = useSelector((store) => store.state);
	const { popconfirm } = props.col;
	return (
		<Popconfirm
			title={popconfirm.HintText}
			onConfirm={() => {
				popconfirm.callback({
					record: props.record,
					setLoading: dispatch.setLoading,
					setData: dispatch.setData,
					data: state.data,
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
