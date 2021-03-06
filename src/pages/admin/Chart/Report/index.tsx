import React, { useEffect, useState } from 'react';
import { Result, Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { useRequest } from '../../../../js';

interface ResDataType {
	profit: number; // 盈利情况
	staffSalary: number; // 员工总工资
	maintainPrice: number; // 维修所需费用
	income: number; // 本月租金收入
}
const ResultStatus: ('info' | 'warning')[] = ['info', 'warning'];
const ResultIcons = [<SmileOutlined />, <FrownOutlined />];

const Report: React.FC<{}> = (props) => {
	const [data, setData] = useState<ResDataType>(); // 请求的数据
	const [status, setStatus] = useState<0 | 1>(0); // 当前report状态

	const { loading, run } = useRequest<ResDataType, {}>(
		'/admin/chart/report',
		{
			onSuccess: ({ data }) => {
				setData(data);
				if (data.profit < 0) {
					setStatus(1); // 设置为⚠
				}
			},
		}
	);
	useEffect(() => {
		run({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Card
			loading={loading}
			hoverable={true}
			style={{
				backgroundColor: 'white',
				marginBottom: '30px',
			}}>
			{data === undefined ? null : (
				<Result
					icon={ResultIcons[status]}
					status={ResultStatus[status]}
					title={
						<div>
							<div>
								本月利润: ￥<span>{data.profit}</span>
							</div>
							<div>
								员工总工资: ￥<span>{data.staffSalary}</span>
							</div>
							<div>
								本月维修支出: ￥
								<span>{data.maintainPrice}</span>
							</div>
							<div>
								本月租金收入: ￥<span>{data.income}</span>
							</div>
						</div>
					}
				/>
			)}
		</Card>
	);
};

export default Report;
