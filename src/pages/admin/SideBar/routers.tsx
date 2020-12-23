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

const icons: {
	[propName: string]: React.ReactNode;
} = {
	'/admin/role': <TeamOutlined />,
	'/admin/permission': <SafetyOutlined />,
	'/admin/room': <HomeOutlined />,
	'/admin/subscribe': <ClockCircleOutlined />,
	'/admin/contract': <DatabaseOutlined />,
	'/admin/maintain': <ToolOutlined />,
	'/admin/staff': <UserOutlined />,
	'/admin/roomer': <UserOutlined />,
	'/admin/chart': <LineChartOutlined />,
	'/admin/chat': <WechatOutlined />,
	'/admin/log': <FileTextOutlined />,
	'/admin/test': <WarningOutlined />,
};
export default icons;
