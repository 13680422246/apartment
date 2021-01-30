import React, { memo } from 'react';
import { useTitle, classNames } from '../../../js';
import style from './index.module.scss';

const cls = classNames.bind(style);

interface IPros {}
const defaultProps = {};
const UserCenter: React.FC<IPros> = (props) => {
	useTitle('用户中心'); // 修改title
	return <div className={cls('userCenter')}>userCenter</div>;
};
UserCenter.defaultProps = defaultProps;
export default memo(UserCenter);
