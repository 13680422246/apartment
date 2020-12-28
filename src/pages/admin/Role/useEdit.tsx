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
		dataIndex: 'edit123',
		editor: {
			callback: ({ row, cancel, setLoading, editData, setData }) => {
				setLoading(true);
				editRun(row).then((res) => {
					if (res !== undefined && res.running === true) {
						const { data } = res;
						if (data && data.type === 'success') {
							editData(row);
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
