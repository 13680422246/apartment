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
const Chat = lazy(() => import('../pages/admin/Chat'));
const Test = lazy(() => import('../pages/admin/Test'));
const Room = lazy(() => import('../pages/admin/Room'));

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
		component: null,
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
		component: null,
	},
	'/admin/roomer': {
		icon: <UserOutlined />,
		component: null,
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
