import { HiddenField } from '../../../components';
const columns = [
	{
		title: '用户ID',
		dataIndex: 'id',
		search: true,
		sorter: {
			compare: (a, b) => a.username.localeCompare(b.username),
			multiple: 3,
		},
	},
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
		title: '密码',
		dataIndex: 'pwd',
		render: (text, record) => <HiddenField text={text} />,
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
];

export default columns;
