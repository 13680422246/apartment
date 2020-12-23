import React, { useContext } from 'react';
import CommonCard from '../components/CommonCard';
import { TopViewProvider } from '../index';

const TotalStaff: React.FC<{}> = (props) => {
	const values = useContext(TopViewProvider);

	const { data } = values;
	return (
		<CommonCard
			loading={values.loading}
			title='员工总人数'
			value={data === undefined ? '' : data.staffNum}
			chart={
				data === undefined ? null : (
					<div
						style={{
							lineHeight: '50px',
						}}>
						共有<span>{data.roleNum}</span>名角色
					</div>
				)
			}
			footer={
				<div>
					<span>员工总工资</span>
					<span
						style={{
							marginLeft: '10px',
						}}>
						￥{data === undefined ? '' : data.staffSalary}
					</span>
				</div>
			}
		/>
	);
};

export default TotalStaff;
