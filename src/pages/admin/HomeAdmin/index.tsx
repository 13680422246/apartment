import React, { memo } from 'react';
import { Typography, Space } from 'antd';
import style from './index.module.scss';
import { useTitle } from '../../../js';

interface IPros {}
const defaultProps = {};
const HomeAdmin: React.FC<IPros> = (props) => {
	useTitle('后台管理系统');
	return (
		<>
			<Typography.Text type='secondary' className={style.block}>
				基于SSM的单身公寓管理系统
			</Typography.Text>
			<Typography.Text type='secondary'>
				<Space className={style.footer}>
					<span>
						版权所有: supyp
						&#x28;推荐使用谷歌浏览器，可以获得更加操作页面体验&#x29;
					</span>
					<span>技术支持: supyp</span>
				</Space>
			</Typography.Text>
		</>
	);
};
HomeAdmin.defaultProps = defaultProps;
export default memo(HomeAdmin);
