import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const columns = [
	{
		title: '房间id',
		dataIndex: 'roomid',
		search: true,
		sorter: {
			compare: (a, b) => a.roomid > b.roomid,
			multiple: 3,
		},
		render: (text, record, children) => {
			return <NavLink to={`/room/${text}`}>{children}</NavLink>;
		},
	},
	{
		title: '备注',
		dataIndex: 'remark',
		editable: true,
		inputType: 'textarea',
		rules: [
			{
				required: true,
				message: `备注不能为空`,
			},
		],
	},
	{
		title: '开始时间',
		dataIndex: 'starttime',
		render: (text, record) => {
			// 将时间戳转换为日期显示
			return <span>{moment(text).format('YYYY-MM-DD')}</span>;
		},
		sorter: {
			compare: (a, b) => moment(a.starttime) > moment(b.starttime),
			multiple: 3,
		},
	},
	{
		title: '是否完成',
		dataIndex: 'isend',
		render: (text, record) => {
			return text == 1 ? <span>是</span> : <span>否</span>;
		},
		sorter: {
			compare: (a, b) => a.isend > b.isend,
			multiple: 3,
		},
		filterMultiple: false,
		filters: [
			{
				text: '是',
				value: 1,
			},
			{
				text: '否',
				value: 0,
			},
		],
	},
	{
		title: '花费',
		dataIndex: 'price',
		sorter: {
			compare: (a, b) => a.price > b.price,
			multiple: 3,
		},
		editable: true,
		inputType: 'number',
		rules: [
			{
				required: true,
				message: `维修价格不能为空`,
			},
		],
	},
	{
		title: '结束时间',
		dataIndex: 'endtime',
		sorter: {
			compare: (a, b) => moment(a.starttime) > moment(b.starttime),
			multiple: 3,
		},
		render: (text, record) => {
			// 将时间戳转换为日期显示
			return !text ? (
				<span></span>
			) : (
				<span>{moment(text).format('YYYY-MM-DD')}</span>
			);
		},
	},
];

export default columns;
