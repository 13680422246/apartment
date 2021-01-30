import { lazy } from 'react';
import {
	WechatOutlined,
	TeamOutlined,
	SafetyOutlined,
	HomeOutlined,
	ClockCircleOutlined,
	ToolOutlined,
	LineChartOutlined,
	UserOutlined,
	FileTextOutlined,
	DatabaseOutlined,
	WarningOutlined,
} from '@ant-design/icons';
const Role = lazy(() => import('../pages/admin/Role'));
const Permission = lazy(() => import('../pages/admin/Permission'));
const Chart = lazy(() => import('../pages/admin/Chart'));
const Chat = lazy(() => import('../pages/admin/Chat')); // 聊天
const Test = lazy(() => import('../pages/admin/Test')); // 定时任务
const Room = lazy(() => import('../pages/admin/Room')); // 房间管理
const Roomer = lazy(() => import('../pages/admin/Roomer')); // 房客管理
const Staff = lazy(() => import('../pages/admin/Staff')); // 员工管理
const Subscribe = lazy(() => import('../pages/admin/Subscribe')); // 预约管理

const routers: {
	[propName: string]: {
		icon: React.ReactNode;
		component: React.FC<{}> | null;
	};
} = {
	'/admin/role': {
		icon: <TeamOutlined />,
		component: Role,
	},
	'/admin/permission': {
		icon: <SafetyOutlined />,
		component: Permission,
	},
	'/admin/room': {
		icon: <HomeOutlined />,
		component: Room,
	},
	'/admin/subscribe': {
		icon: <ClockCircleOutlined />,
		component: Subscribe,
	},
	'/admin/contract': {
		icon: <DatabaseOutlined />,
		component: null,
	},
	'/admin/maintain': {
		icon: <ToolOutlined />,
		component: null,
	},
	'/admin/staff': {
		icon: <UserOutlined />,
		component: Staff,
	},
	'/admin/roomer': {
		icon: <UserOutlined />,
		component: Roomer,
	},
	'/admin/chart': {
		icon: <LineChartOutlined />,
		component: Chart,
	},
	'/admin/chat': {
		icon: <WechatOutlined />,
		component: Chat,
	},
	'/admin/log': {
		icon: <FileTextOutlined />,
		component: null,
	},
	'/admin/test': {
		icon: <WarningOutlined />,
		component: Test,
	},
};
export default routers;
