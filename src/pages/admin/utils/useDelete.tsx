import { useRequest } from '../../../js';
import { IActionPopconfirm } from '../../../components/EditableTableForm/render/renderPopconfirm';

function useDelete(
	url: string,
	options = {
		title: '删除',
		text: '删除',
		HintText: '确认删除?',
	}
) {
	const { run: deleteRun } = useRequest<
		{
			type: 'success' | 'error';
			msg: string;
		},
		{
			id: string;
		}
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
					content: '删除成功',
				});
			}
		},
	});
	let column: IActionPopconfirm = {
		title: options.title,
		dataIndex: 'delete',
		popconfirm: {
			text: options.text,
			HintText: options.HintText,
			callback: ({ record, setLoading, setData, data: datasource }) => {
				setLoading(true);
				deleteRun({
					id: record.id as string,
				}).then((res) => {
					if (res !== undefined && res.running === true) {
						const { data } = res;
						if (data && data.type === 'success') {
							console.info(record);
							// role eg. {id: 76, rolename: "角色-181", remark: "角色描述-18"}
							// permission eg. {id: 92, parentid: 89, name: "房间名6", url: "/qwed"}
							// 存在parentid - 删除子级权限
							if (record.parentid) {
								// 找到父权限
								const parentIndex = datasource.findIndex(
									(item) => item.id === record.parentid
								);
								if (parentIndex !== -1) {
									const children = datasource[parentIndex]
										.children as any[];
									const index = children.findIndex(
										(item) => item.id === record.id
									);
									if (index !== -1) {
										const newData = [...datasource];
										// 新的子权限
										const childrens = [...children];
										childrens.splice(index, 1);
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
								const index = datasource.findIndex(
									(item) => item.id === record.id
								);
								if (index !== -1) {
									const newData = [...datasource];
									newData.splice(index, 1);
									setData(newData);
								}
							}
						}
						setLoading(false);
					}
				});
			},
		},
	};
	return column;
}
export default useDelete;
