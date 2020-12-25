import React, { useRef, useEffect, useContext } from 'react';
import { Space, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TableFormContext } from '../Provider';

/**
 * 搜索输入框
 */
export default (function (props: any) {
	const { dispatch, state } = useContext(TableFormContext);
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
		dispatch &&
			dispatch({
				type: 'searchText',
				args: [selectedKeys[0]],
			});
		dispatch &&
			dispatch({
				type: 'searchedColumn',
				args: [dataIndex],
			});
	};
	const handleReset = () => {
		clearFilters();
		dispatch &&
			dispatch({
				type: 'searchText',
				args: [''],
			});
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
