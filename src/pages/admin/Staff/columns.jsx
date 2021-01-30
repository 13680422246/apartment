import { HiddenField } from '../../../components';
const columns = [
	{
		title: '用户名',
		dataIndex: 'username',
		search: true,
		sorter: {
			compare: (a, b) => a.username.localeCompare(b.username),
			multiple: 3,
		},
	},
	{
		title: '角色名',
		dataIndex: 'rolename',
		search: true,
		sorter: {
			compare: (a, b) => a.rolename.localeCompare(b.rolename),
			multiple: 3,
		},
	},
	{
		title: '真实姓名',
		dataIndex: 'realname',
		search: true,
		sorter: {
			compare: (a, b) => a.realname.localeCompare(b.realname),
			multiple: 3,
		},
	},
	{
		title: '手机号',
		dataIndex: 'phone',
		search: true,
		sorter: {
			compare: (a, b) => a.phone.localeCompare(b.phone),
			multiple: 3,
		},
		render: (text, record) => <HiddenField text={text} />,
	},
	{
		title: '身份证',
		dataIndex: 'idcard',
		search: true,
		sorter: {
			compare: (a, b) => a.idcard.localeCompare(b.idcard),
			multiple: 3,
		},
		render: (text, record) => <HiddenField text={text} />,
	},
	{
		title: '工资',
		dataIndex: 'salary',
		search: true,
		sorter: {
			compare: (a, b) => a.salary.localeCompare(b.salary),
			multiple: 3,
		},
		editable: true,
		inputType: 'number',
		rules: [
			{
				required: true,
				message: `工资不能为空`,
			},
		],
	},
];

export default columns;
