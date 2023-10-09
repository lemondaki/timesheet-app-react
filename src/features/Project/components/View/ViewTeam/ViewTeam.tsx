import React from 'react';
import { ITimeStatisticMemberDto } from '../../../interface/project.interface';
import Table, { ColumnsType } from 'antd/es/table';
interface DataType {
  key: React.Key;
  name: string;
  hours: number;
  billable: number;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Hours',
    dataIndex: 'hours'
  },
  {
    title: 'Billable',
    dataIndex: 'billable'
  }
];
const ViewTeam = ({ data }: { data: ITimeStatisticMemberDto[] }): JSX.Element => {
  const dataViewTask = data.map((d) => ({
    key: d.userID,
    name: d.userName,
    hours: d.billableWorkingTime,
    billable: d.totalWorkingTime
  }));
  return <Table columns={columns} dataSource={dataViewTask} />;
};

export default ViewTeam;
