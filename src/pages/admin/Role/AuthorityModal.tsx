import React, { memo, useCallback, useState } from 'react';
import { FormModal, FormModalProps } from '../../../components';
import useDispatch from '../../../components/EditableTableForm/store/dispatch';
import { useRequest } from '../../../utils';
import { Spin, Tree } from 'antd';

interface IPros {
	text: string;
	record: any;
}
const AuthorityModal: React.FC<IPros> = (props) => {
	const dispatch = useDispatch();
	const [data, setData] = useState<any[]>([]);
	const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
	const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

	/**
	 * 找到我的授权
	 */
	const { run: MyAuthorityRun, loading: MyAuthorityLoading } = useRequest<
		any,
		{
			userid: string;
		}
	>('/admin/authority/findMyAuthority', {
		onSuccess: ({ data }) => {
			setExpandedKeys(data);
			setCheckedKeys(data);
			setSelectedKeys(data);
		},
	});

	/**
	 * 找到所有的权限
	 */
	const { run: permissionRun, loading: permissionLoading } = useRequest<
		any,
		{
			current: number;
			pageSize: number;
		}
	>('/admin/permission/findAll', {
		onSuccess: ({ data }) => {
			// 处理数据源
			const treeData: any[] = []; // 返回值
			for (const item of data.list) {
				if (item.parentid == null) {
					treeData.push({
						key: item.id,
						title: item.name,
					});
				}
			}
			for (const item of data.list) {
				if (item.parentid != null) {
					// 找到父级
					for (const item2 of treeData) {
						if (item2.key === item.parentid) {
							if (item2.children === undefined)
								item2.children = [];
							item2.children.push({
								key: item.id,
								title: item.name,
							});
							break;
						}
					}
				}
			}
			setData(treeData);
		},
	});

	/**
	 * 进行授权动作
	 */
	const { run: addAuthorityRun } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			ids: string;
			roleid: string;
		}
	>('/admin/authority/add', {
		onSuccess: ({ Hint, data }) => {
			if (data.type === 'success') {
				Hint({
					type: 'success',
					content: `${props.record.rolename}-授权成功`,
				});
			} else {
				Hint({
					type: 'error',
					content: `${props.record.rolename}-${data.msg}`,
				});
			}
		},
	});

	const handleOpen = useCallback(() => {
		permissionRun({
			current: 1,
			pageSize: 9999,
		});
		MyAuthorityRun({
			userid: props.record.id,
		});
	}, [MyAuthorityRun, permissionRun, props.record.id]);

	const handleOk = useCallback<NonNullable<FormModalProps['callback']>>(
		({ setConfirmLoading, setVisible, resetFields }) => {
			setConfirmLoading(true); // 确认按钮显示loading
			addAuthorityRun({
				ids: checkedKeys.join(','),
				roleid: props.record.id,
			}).then((res) => {
				if (res && res.running === true) {
					const { data } = res;
					if (data && data.type === 'success') {
						setVisible(false);
						resetFields();
					}
					setConfirmLoading(false);
				}
			});
		},
		[addAuthorityRun, checkedKeys, props.record.id]
	);
	const loading = permissionLoading || MyAuthorityLoading;
	return (
		<div>
			<FormModal
				okButtonDisable={loading}
				disabled={dispatch.getDisable()}
				title={`角色[${props.record.rolename}]的授权`}
				component={<span>授权</span>}
				open={handleOpen}
				callback={handleOk}>
				{loading ? (
					<>
						<Spin
							size='large'
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}></Spin>
					</>
				) : (
					<>
						<Tree
							checkable
							treeData={data}
							onExpand={(expandedKeys) => {
								setExpandedKeys(expandedKeys);
							}}
							expandedKeys={expandedKeys}
							onCheck={(checkedKeys) => {
								setCheckedKeys(checkedKeys as any[]);
							}}
							checkedKeys={data.length === 0 ? [] : checkedKeys}
							onSelect={(selectedKeys, info) => {
								setSelectedKeys(selectedKeys);
							}}
							selectedKeys={data.length === 0 ? [] : selectedKeys}
						/>
					</>
				)}
			</FormModal>
		</div>
	);
};
export default memo(AuthorityModal);
