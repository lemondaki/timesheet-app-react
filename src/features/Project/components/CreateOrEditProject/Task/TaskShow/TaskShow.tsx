import React from 'react';
import { Card } from 'antd';
import TaskItem from '../TaskItem/TaskItem';
import { useFormContext } from '../../../../../../context/FormContext/FormProvider';
import classNames from 'classnames/bind';
import styles from './TaskShow.module.scss';
const cx = classNames.bind(styles);
const TaskShow = (): JSX.Element => {
  const {
    state: { tasks }
  } = useFormContext();

  return (
    <div className={cx('taskshow-content')}>
      <Card>
        <div className={cx('card-heading')}>
          <p>Task</p>
          <p>Billable</p>
        </div>
      </Card>
      <div className={cx('taskshow-list')}>
        {tasks.map((task) => (
          <TaskItem key={task.id} taskItem={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskShow;
