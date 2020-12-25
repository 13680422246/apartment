const columns = [
	{
		title: '角色名称',
		dataIndex: 'rolename',
		width: '20%',
		editable: true,
		rules: [
			{
				required: true,
				message: `角色名称不能为空`,
			},
		],
		sorter: {
			compare: (a, b) => a.rolename.localeCompare(b.rolename),
			multiple: 2,
		},
		search: true,
	},
	{
		title: '角色描述',
		dataIndex: 'remark',
		width: '40%',
		editable: true,
		sorter: {
			compare: (a, b) => a.rolename.localeCompare(b.rolename),
			multiple: 1,
		},
		search: true,
	},
	{
		title: '授权',
		dataIndex: 'authority',
	},
	{
		title: '编辑',
		dataIndex: 'edit',
	},
	{
		title: '删除',
		dataIndex: 'delete',
	},
];
export default columns;
