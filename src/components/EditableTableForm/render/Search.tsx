import React, { useRef, useEffect } from 'react';
import { Space, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from '../store';
import useDispatch from '../store/dispatch';

/**
 * 搜索输入框
 */
export default (function (props: any) {
	const state = useSelector((store) => store.state);
	const dispatch = useDispatch();
	const {
		dataIndex,
		setSelectedKeys,
		selectedKeys,
		confirm,
		clearFilters,
	} = props;
	// 搜索属性
	const inputRef = useRef<Input | null>(null);
	const handleSearch = (selectedKeys: any) => {
		confirm();
		dispatch.setSearchText(selectedKeys[0]);
		dispatch.setSearchedColumn(dataIndex);
	};
	const handleReset = () => {
		clearFilters();
		dispatch.setSearchText('');
	};
	/**
	 * 监听搜索文本
	 */
	useEffect(() => {
		if (
			state.searchText === '' &&
			!!inputRef.current &&
			!!inputRef.current.state.value
		) {
			handleReset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.searchText]);
	return (
		<div style={{ padding: 8 }}>
			<Input
				ref={(node) => {
					inputRef.current = node;
				}}
				placeholder={`Search ${dataIndex}`}
				value={selectedKeys[0]}
				onChange={(e) => {
					setSelectedKeys(e.target.value ? [e.target.value] : []);
				}}
				onPressEnter={() => handleSearch(selectedKeys)}
				style={{ width: 188, marginBottom: 8, display: 'block' }}
			/>
			<Space>
				<Button
					type='primary'
					onClick={() => handleSearch(selectedKeys)}
					icon={<SearchOutlined />}
					size='small'
					style={{ width: 90 }}>
					Search
				</Button>
				<Button
					onClick={() => handleReset()}
					size='small'
					style={{ width: 90 }}>
					Reset
				</Button>
			</Space>
		</div>
	);
});
