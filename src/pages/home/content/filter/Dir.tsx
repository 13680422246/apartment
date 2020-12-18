import { List, Tag } from 'antd';
import React, { memo, useState } from 'react';
import style from './style.module.scss';

interface IPros {
	data: string[];
	handleClick: (item: string) => void;
}
const defaultProps = {};
const Dit: React.FC<IPros> = (props) => {
	// 记录item
	const [itemIndex, setItemIndex] = useState(0);
	// 处理点击事件
	const handleClick = (index: number, item: string) => {
		setItemIndex(index);
		props.handleClick(item);
	};

	return (
		<div className={style.container}>
			<List
				itemLayout='vertical'
				split={false}
				dataSource={props.data}
				renderItem={(item, index) => {
					return (
						<List.Item
							style={{
								display: 'inline-block',
							}}
							onClick={() => handleClick(index, item)}>
							<Tag
								color={itemIndex === index ? 'red' : 'default'}
								style={{
									padding: '20px',
									fontSize: '20px',
								}}>
								{item}
							</Tag>
						</List.Item>
					);
				}}></List>
		</div>
	);
};
Dit.defaultProps = defaultProps;
export default memo(Dit);
