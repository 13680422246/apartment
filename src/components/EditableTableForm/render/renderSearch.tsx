import React, { useContext } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Search from './Search';
import { TableFormContext } from '../Provider';
/**
 * 搜索后高亮显示文本
 */
const HighlightComponent: React.FC<any> = function (props) {
	const { dataIndex, text } = props;
	const { state } = useContext(TableFormContext);
	return state.searchedColumn === dataIndex ? (
		<Highlighter
			highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
			searchWords={[state.searchText]}
			autoEscape
			textToHighlight={text ? text.toString() : ''}
		/>
	) : (
		<span>{text}</span>
	);
};

const renderSearch = (dataIndex: string, render: any) => ({
	filterDropdown: ({
		setSelectedKeys,
		selectedKeys,
		confirm,
		clearFilters,
	}: any) => (
		<Search
			setSelectedKeys={setSelectedKeys}
			selectedKeys={selectedKeys}
			confirm={confirm}
			clearFilters={clearFilters}
			dataIndex={dataIndex}
		/>
	),
	filterIcon: (filtered: any) => (
		<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
	),
	onFilter: (value: any, record: any) =>
		record[dataIndex]
			? record[dataIndex]
					.toString()
					.toLowerCase()
					.includes(value.toLowerCase())
			: '',
	onFilterDropdownVisibleChange: (visible: boolean) => {
		if (visible) {
			// setTimeout(() => store.getState().tableFormReducer.select(), 100);
		}
	},
	render: (text: string, record: any) => {
		if (!!render) {
			return render(
				text,
				record,
				<HighlightComponent text={text} dataIndex={dataIndex} />
			);
		}
		return <HighlightComponent text={text} dataIndex={dataIndex} />;
	},
});
export default renderSearch;
