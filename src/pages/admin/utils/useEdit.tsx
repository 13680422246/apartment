import { useRequest } from '../../../utils';
import { IActionSave } from '../../../components/EditableTableForm/render/renderEdit';

function useEdit(url: string): IActionSave {
	const { run: editRun } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		any
	>(url, {
		onSuccess: ({ Hint, data }) => {
			if (data.type === 'error') {
				Hint({
					type: 'error',
					content: data.msg,
				});
			} else {
				Hint({
					type: 'success',
					content: '修改成功',
				});
			}
		},
	});

	return {
		title: '编辑',
		dataIndex: 'edit',
		editor: {
			callback: ({
				row,
				cancel,
				setLoading,
				data: datasource,
				setData,
			}) => {
				// row
				// eg. {rolename: "角色-20", remark: "描述-20", id: 77, parentid: undefined}
				// eg. {name: "房间名1", url: "/qwea", id: 101, parentid: 100}
				setLoading(true);
				editRun(row).then((res) => {
					if (res !== undefined && res.running === true) {
						const { data } = res;
						if (data && data.type === 'success') {
							// 处理编辑数据 - 业务逻辑
							if (row.parentid) {
								// 找到父权限
								const parentIndex = datasource.findIndex(
									(item) => item.id === row.parentid
								);
								if (parentIndex !== -1) {
									// 找到子权限
									const children = datasource[parentIndex]
										.children as any[];
									const index = children.findIndex(
										(item) => item.id === row.id
									);
									if (index !== -1) {
										const newData = [...datasource];
										// 新的子权限
										const childrens = [...children];
										childrens.splice(index, 1, row);
										// 新的父权限
										const newParent = newData[parentIndex];
										newParent.children = childrens;
										newData.splice(
											parentIndex,
											1,
											newParent
										);
									}
								}
							} else {
								const newData = [...datasource]; // clone
								const index = newData.findIndex(
									(item) => row.id === item.id
								);
								newData.splice(index, 1, {
									...newData[index],
									...row,
								});
								setData(newData);
							}
							cancel();
						}
						setLoading(false);
					}
				});
			},
		},
	};
}

export default useEdit;
