import React from 'react';
import Table, { ColumnsType } from 'antd/es/table';
import { ITimeStatisticTaskDto } from '../../../interface/project.interface';
interface DataType {
  key: React.Key;
  billableTasks: string;
  hours: number;
  billableHours: number;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Billable Tasks',
    dataIndex: 'billableTasks'
  },
  {
    title: 'Hours',
    dataIndex: 'hours'
  },
  {
    title: 'Billable Hours',
    dataIndex: 'billableHours'
  }
];

const ViewTask = ({ data }: { data: ITimeStatisticTaskDto[] }): JSX.Element => {
  const dataViewTask = data.map((d) => ({
    key: d.taskId,
    billableTasks: d.taskName,
    hours: d.billableWorkingTime,
    billableHours: d.totalWorkingTime
  }));
  return <Table columns={columns} dataSource={dataViewTask} />;
};

export default ViewTask;
