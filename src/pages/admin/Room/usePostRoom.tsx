import { Hint } from '../../../components';
import { IActionSave } from '../../../components/EditableTableForm/render/renderEdit';
import { POSTROOM } from '../../../js/proxy';

function useEdit(url: string): IActionSave {
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
				// console.log(row);
				// area: 25
				// dir: "东南"
				// housetype: "单间0卫"
				// id: 3
				// name: "房间3"
				// parentid: undefined
				// price: 450
				// tags: "配套齐全/精装修/拎包入住"
				// upload: [{…}]
				setLoading(true);
				POSTROOM(
					url,
					row,
					() => {
						setLoading(false);
						cancel();
						Hint({
							type: 'success',
							content: '修改成功',
						});
					},
					() => {
						setLoading(false);
					}
				);
			},
		},
	};
}

export default useEdit;
