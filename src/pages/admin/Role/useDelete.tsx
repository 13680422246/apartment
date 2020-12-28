import { useRequest } from '../../../utils';
import { IActionPopconfirm } from '../../../components/EditableTableForm/render/renderPopconfirm';

function useDelete(url: string) {
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
		title: '删除',
		dataIndex: 'delete',
		popconfirm: {
			text: '删除',
			HintText: '确认删除?',
			callback: ({ id, setLoading, deleteData }) => {
				setLoading(true);
				deleteRun({
					id,
				}).then((res) => {
					if (res !== undefined && res.running === true) {
						const { data } = res;
						if (data && data.type === 'success') {
							deleteData(id);
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
