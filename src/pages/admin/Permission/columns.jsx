const columns = [
	{
		title: '权限名称',
		dataIndex: 'name',
		width: '20%',
		editable: true,
		rules: [
			{
				required: true,
				message: `角色名称不能为空`,
			},
		],
		search: true,
	},
	{
		title: 'URL',
		dataIndex: 'url',
		width: '30%',
		editable: true,
		rules: [
			{
				required: true,
				message: 'url不能为空',
			},
			{
				pattern: new RegExp(/^\/[a-z | A-Z | /]+$/, 'g'),
				message: 'URL格式错误',
			},
		],
		search: true,
	},
];
export default columns;
