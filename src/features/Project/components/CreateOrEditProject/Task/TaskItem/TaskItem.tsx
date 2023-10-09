import React from 'react';
import { Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './TaskItem.module.scss';
import { ITaskDto } from '../../../../interface/project.interface';
import { useFormContext } from '../../../../../../context/FormContext/FormProvider';
import { removeTask, updateTask } from '../../../../../../context/FormContext/FormAction';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
const cx = classNames.bind(styles);
const TaskItem = ({ taskItem }: { taskItem: ITaskDto }): JSX.Element => {
  const { dispatchForm } = useFormContext();
  function handleRemoveTask(): void {
    dispatchForm(removeTask(taskItem));
  }

  function handleUpdateTask(e: CheckboxChangeEvent): void {
    dispatchForm(updateTask(taskItem));
  }

  return (
    <div className={cx('task-item')}>
      <div className={cx('wrapper-left')}>
        <CloseOutlined onClick={handleRemoveTask} />
        <span>{taskItem.name}</span>
      </div>
      <Checkbox defaultChecked={taskItem.billable} onChange={handleUpdateTask} />
    </div>
  );
};

export default TaskItem;
