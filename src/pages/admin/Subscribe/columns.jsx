import moment from 'moment';
import { NavLink } from 'react-router-dom';
import CheckInModal from './CheckInModal';

const columns = [
	{
		title: '用户名',
		dataIndex: 'username',
		search: false,
	},
	{
		title: '真实姓名',
		dataIndex: 'realname',
		search: true,
	},
	{
		title: '房间id',
		dataIndex: 'roomid',
		sorter: {
			compare: (a, b) => a.roomid > b.roomid,
			multiple: 3,
		},
		search: true,
		render: (text, record, children) => {
			return <NavLink to={`/room/${text}`}>{children}</NavLink>;
		},
	},
	{
		title: '预约入住时间',
		dataIndex: 'checkintime',
		sorter: {
			compare: (a, b) => moment(a.checkintime) > moment(b.checkintime),
			multiple: 3,
		},
		render: (text, record) => (
			<span>{moment(text).format('YYYY-MM-DD')}</span>
		),
		filterMultiple: false,
		filters: [
			{
				text: '今天',
				value: 0,
			},
			{
				text: '明天',
				value: 1,
			},
			{
				text: '后天',
				value: 2,
			},
			{
				text: '未来一周',
				value: 'week',
			},
		],
	},
	{
		title: '订单创建时间',
		dataIndex: 'createtime',
		sorter: {
			compare: (a, b) => moment(a.createtime) > moment(b.createtime),
			multiple: 3,
		},
		render: (text, record) => (
			<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
		),
		filterMultiple: false,
		filters: [
			{
				text: '今天',
				value: 0,
			},
			{
				text: '昨天',
				value: 1,
			},
			{
				text: '前天',
				value: 2,
			},
			{
				text: '过去一周',
				value: 'week',
			},
		],
	},
	{
		title: '备注',
		dataIndex: 'remark',
		search: true,
	},
	{
		title: '状态',
		dataIndex: 'status',
		render: (text, record) => {
			const num = parseInt(text);
			if (num === 0) {
				return <span>预定中</span>;
			} else if (num === 1) {
				return <span>成功入住</span>;
			} else if (num === 2) {
				return <span>已取消</span>;
			} else {
				return <span>预约超时</span>;
			}
		},
		filterMultiple: false,
		filters: [
			{
				text: '预定中',
				value: 0,
			},
			{
				text: '成功入住',
				value: 1,
			},
			{
				text: '已取消',
				value: 2,
			},
			{
				text: '预约超时',
				value: 3,
			},
		],
	},
	{
		title: '入住',
		dataIndex: 'subscribe',
		render: (text, record) => <CheckInModal record={record} />,
	},
];

export default columns;
