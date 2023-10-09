import React from 'react';
import { Card } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './TaskSelect.module.scss';
import { useFormContext } from '../../../../../../context/FormContext/FormProvider';
import { addTask } from '../../../../../../context/FormContext/FormAction';
import { ITaskDto } from '../../../../interface/project.interface';
const cx = classNames.bind(styles);
const TaskSelect = (): JSX.Element => {
  const {
    state: { selectTaskArray },
    dispatchForm
  } = useFormContext();
  function handleAddTask(task: ITaskDto): void {
    dispatchForm(addTask(task));
  }
  return (
    <div className={cx('taskselect-content')}>
      <Card>
        <p className={cx('taskselect-heading')}>Task Select</p>
      </Card>
      <div className={cx('taskselect-list')}>
        {selectTaskArray.map((task) => (
          <div
            key={task.id}
            className={cx('task-item')}
            onClick={() => {
              handleAddTask(task);
            }}
          >
            <div className={cx('wrapper-left')}>
              <PlusCircleOutlined />
              <span>{task.name}</span>
            </div>
            <span>{task.type ? 'Other Task' : 'Common Task'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSelect;
