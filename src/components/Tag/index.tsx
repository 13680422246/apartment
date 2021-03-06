import React, { memo } from 'react';
import { Tag as AntdTag } from 'antd';
import style from './index.module.scss';

interface IPros {
	onClick?: () => void;
	closable?: boolean;
	children: React.ReactNode;
}
const defaultProps = {
	closable: true,
};
const Tag: React.FC<IPros> = (props) => {
	return (
		<AntdTag
			className={style.tag}
			closable={props.closable}
			onClose={(e) => {
				e.preventDefault();
				props.onClick && props.onClick();
			}}>
			{props.children}
		</AntdTag>
	);
};
Tag.defaultProps = defaultProps;
export default memo(Tag);
