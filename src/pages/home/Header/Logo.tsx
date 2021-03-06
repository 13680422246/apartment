import React, { memo, useState, useEffect } from 'react';
import { Grid } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
const { useBreakpoint } = Grid;

const TextLogo: React.FC<{
	text: React.ReactNode;
}> = (props) => {
	const history = useHistory();
	const handleClick = () => {
		history.push('/');
	};
	return <span onClick={handleClick}>{props.text}</span>;
};
const IconLogo: React.FC<{
	icon: React.ReactNode;
}> = (props) => {
	const history = useHistory();
	const handleClick = () => {
		history.goBack();
	};
	return <span onClick={handleClick}>{props.icon}</span>;
};

interface IPros {
	title: React.ReactNode; // 首页标题
	icon: React.ReactNode; // 首页logo
}
const defaultProps = {};
const Logo: React.FC<IPros> = (props) => {
	const screens = useBreakpoint();
	const [logo, setLogo] = useState<'text' | 'logo' | 'goback'>('text');

	/**
	 * 在text and logo之间切换
	 */
	useEffect(() => {
		if (screens.xs) {
			setLogo('logo');
		} else {
			setLogo('text');
		}
	}, [screens]);

	const getLogo = () => {
		switch (logo) {
			case 'text':
				return <TextLogo text={props.title} />;
			case 'logo':
				return <IconLogo icon={props.icon} />;
			default:
				return <IconLogo icon={props.icon} />;
		}
	};
	return <div>{getLogo()}</div>;
};
Logo.defaultProps = defaultProps;
export default memo(Logo);
