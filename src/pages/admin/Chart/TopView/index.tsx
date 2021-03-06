import React, { useEffect, useState, createContext } from 'react';
import { Row, Col } from 'antd';
import TotalUser from './TotalUser';
import TotalStaff from './TotalStaff';
import { useRequest } from '../../../../js';

interface ITopviewData {
	staffNum: string;
	roleNum: string;
	staffSalary: string;
	userNum: string;
	todayUserNum: string;
	userData: any[];
}

export const TopViewProvider = createContext<{
	data: ITopviewData | undefined;
	loading: boolean;
}>({
	data: undefined,
	loading: true,
});

const TopView: React.FC<{}> = (props) => {
	const [data, setData] = useState<ITopviewData>();
	const { run, loading } = useRequest<ITopviewData, {}>(
		'/admin/chart/findTopView',
		{
			onSuccess: ({ data }) => {
				setData(data);
			},
		}
	);
	useEffect(() => {
		run({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<TopViewProvider.Provider
			value={{
				loading,
				data,
			}}>
			<Row gutter={16}>
				<Col
					lg={12}
					md={12}
					sm={12}
					xl={12}
					xs={24}
					style={{
						marginBottom: '24px',
					}}>
					<TotalStaff />
				</Col>
				<Col
					lg={12}
					md={12}
					sm={12}
					xl={12}
					xs={24}
					style={{
						marginBottom: '24px',
					}}>
					<TotalUser />
				</Col>
			</Row>
		</TopViewProvider.Provider>
	);
};

export default TopView;
