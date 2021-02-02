import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import ReletModal from './ReletModal';
import Exit from './Exit';

const columns = [
	{
		title: '用户名',
		dataIndex: 'username',
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
		title: '合同签订时间',
		dataIndex: 'createtime',
		sorter: {
			compare: (a, b) => moment(a.createtime) > moment(b.createtime),
			multiple: 3,
		},
		render: (text, record) => (
			<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
		),
	},
	{
		title: '入住时间',
		dataIndex: 'checkintime',
		sorter: {
			compare: (a, b) => moment(a.checkintime) > moment(b.checkintime),
			multiple: 3,
		},
		render: (text, record) => (
			<span>{moment(text).format('YYYY-MM-DD')}</span>
		),
	},
	{
		title: '租约(月份)',
		dataIndex: 'durationtime',
		sorter: {
			compare: (a, b) => a.durationtime > b.durationtime,
			multiple: 3,
		},
	},
	{
		title: '剩余时间(月份)',
		dataIndex: 'remaintime',
	},
	{
		title: '备注',
		dataIndex: 'remark',
		width: '200px',
	},
	{
		title: '续租',
		dataIndex: 'relet',
		render: (text, record) => <ReletModal record={record} />,
	},
	{
		title: '退租',
		dataIndex: 'exit',
		render: (text, record) => <Exit record={record} />,
	},
];

export default columns;
