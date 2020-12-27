import React, { memo, useEffect, useContext } from 'react';
import { Button, Form, Space, Table } from 'antd';
import { useRequest } from '../../utils';
import EditableCell from './render/EditableCell';
import { TableFormContext, TableFormContextProvider } from './Provider';
import renderPopconfirm from './render/renderPopconfirm';
import renderEdit from './render/renderEdit';
import renderSearch from './render/renderSearch';
import parseParams from './parseParams';

export interface PageInfo {
	hasNextPage: boolean;
	list: any[];
	pageNum: number;
	pageSize: number;
	total: number;
}

interface IPros {
	// 默认每页显示的数量
	defaultPageSize?: number;
	// 请求的基本URL
	fetchUrl: string;
	// 描述列对象
	columns: any[];
	// 处理请求的数据
	handleFetchData: (params: {
		datasource: any[];
		emit: (datasource: any[]) => void;
	}) => void;
	// 顶部显示
	modal?: React.ReactNode;
}
const EditableTableForm: React.FC<IPros> = memo(
	(props) => {
		const { state, dispatch, form } = useContext(TableFormContext);
		/**
		 * 加载数据
		 */
		const { loading: requestLoading, run } = useRequest<
			PageInfo,
			{
				current: number;
				pageSize: number;
				filters?: {
					[propname: string]: any;
				};
				sorterArr?: {
					field: string;
					order: string;
				}[];
			}
		>(props.fetchUrl, {
			onSuccess: ({ data }) => {
				if (dispatch) {
					dispatch({
						type: 'pagination',
						args: [
							{
								current: data.pageNum,
								pageSize: data.pageSize,
								total: data.total,
							},
						],
					});

					props.handleFetchData({
						datasource: data.list,
						emit: (datasource) => {
							dispatch({
								type: 'data',
								args: [datasource],
							});
						},
					});
				}
			},
		});
		useEffect(() => {
			handleReset(); // 重置条件
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		/**
		 * 刷新页面 - 重新请求数据
		 */
		const handleRefresh = () => {
			run(
				parseParams(
					state.pagination,
					state.filteredInfo,
					state.sortedInfo
				)
			);
		};

		/**
		 * 重置条件 - 删除筛选、排序
		 */
		const handleReset = () => {
			run({
				current: 1,
				pageSize: props.defaultPageSize as number,
			});
		};

		/**
		 * onChnage
		 */
		const handleChange = (pagination: any, filters: any, sorter: any) => {
			console.info(`change table`);
			if (dispatch) {
				// 取消编辑状态
				dispatch({
					type: 'editingKey',
					args: [''],
				});
				// 设置筛选和排序
				dispatch({
					type: 'setFilterAndSorter',
					args: [filters, sorter],
				});
				// 重新请求数据
				// 注意: 将defaultPageSize恢复到默认的
				run({
					...parseParams(pagination, filters, sorter),
					pageSize: props.defaultPageSize as number,
				});
			}
		};

		/**
		 * 合并列对象
		 */
		const mergedColumns = props.columns.map((col) => {
			// 如果当前列存在搜索行为
			if (col.search) {
				col = {
					...col,
					...renderSearch(col.dataIndex, col.render),
				};
			}
			// 如果存在排序 - sorter
			if (col.sorter) {
				col = {
					...col,
					sortOrder:
						state.sortedInfo.field === col.dataIndex &&
						state.sortedInfo.order,
				};
			}
			// 如果可以编辑
			if (col.editable) {
				return {
					...col,
					onCell: (record: any) => ({
						record,
						inputType: col.inputType ? col.inputType : 'text',
						dataIndex: col.dataIndex,
						title: col.title,
						editing: false,
						rules: col.rules ? col.rules : [],
					}),
				};
			}
			// 如果当前列为edit , 添加渲染编辑列
			else if (col.editor !== undefined) {
				// 如果col中含有handleSave的话，使用handleSave
				return {
					...col,
					render: (text: string, record: any) =>
						renderEdit(text, record, col),
				};
			}
			// 如果当前列为delete
			else if (col.popconfirm !== undefined) {
				return {
					...col,
					render: (text: string, record: any) =>
						renderPopconfirm(text, record, col),
				};
			}
			return col;
		});

		// 是否处于禁用状态
		const STATUS_DISABLED = requestLoading;
		return (
			<>
				<div
					style={{
						padding: '5px',
					}}>
					<Space size='middle'>
						{props.modal}
						<Button
							disabled={STATUS_DISABLED}
							type='primary'
							onClick={handleRefresh}>
							刷新页面
						</Button>
						<Button
							disabled={STATUS_DISABLED}
							type='primary'
							onClick={handleReset}>
							重置条件
						</Button>
					</Space>
				</div>
				<Form form={form}>
					<Table
						// ui
						bordered
						rowClassName='editable-row'
						// loading
						loading={STATUS_DISABLED}
						// 数据源与列对象
						dataSource={state.data}
						columns={mergedColumns}
						// change
						onChange={handleChange}
						// 配置
						rowKey='id'
						pagination={{
							current: state.pagination.current,
							total: state.pagination.total,
							pageSize: state.pagination.pageSize,
							showSizeChanger: true,
						}}
						components={{
							body: {
								cell: EditableCell,
							},
						}}></Table>
				</Form>
			</>
		);
	},
	() => true
);

const Index: React.FC<IPros> = (props) => {
	const [form] = Form.useForm(); // 为表单设置fomr对象
	return (
		<TableFormContextProvider value={{ form }}>
			<EditableTableForm
				defaultPageSize={props.defaultPageSize}
				fetchUrl={props.fetchUrl}
				columns={props.columns}
				handleFetchData={props.handleFetchData}
				modal={props.modal}
			/>
		</TableFormContextProvider>
	);
};
const defaultProps = {
	defaultPageSize: 10,
	modal: '',
	loading: false,
};
Index.defaultProps = defaultProps;

export default memo(Index);