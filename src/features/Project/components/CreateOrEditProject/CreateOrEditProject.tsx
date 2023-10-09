import React, { useEffect } from 'react';
import { Card, Space, Spin, Steps } from 'antd';
import { Outlet, useParams } from 'react-router-dom';
import { useFormContext } from '../../../../context/FormContext/FormProvider';
import { IProjectDto } from '../../interface/project.interface';
import {
  patchTaskData,
  patchTeamData,
  setFormGeneral,
  setFormNotification
} from '../../../../context/FormContext/FormAction';
import { getProjectById } from '../../service/project.api';
import { useAppContext } from '../../../../context/ProjectContext/ProjectProvider';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './CreateOrEditProject.module.scss';
const cx = classNames.bind(styles);
export const steps = [
  {
    title: 'General',
    key: 'general'
  },
  {
    title: 'Team',
    key: 'team '
  },
  {
    title: 'Task',
    key: 'task '
  },
  {
    title: 'Notification',
    key: 'notification '
  },
  {
    title: 'Completed',
    path: 'completed '
  }
];
const CreateOrEditProject = (): JSX.Element => {
  const { state, dispatchForm } = useFormContext();
  const { id } = useParams();
  const {
    state: { isLoading }
  } = useAppContext();
  const items = steps.map((item) => ({ key: item.key, title: item.title }));
  function patchDataEditProject(data: IProjectDto): void {
    const taskDataId = data.tasks.map((task) => task.taskId);
    const tasks = state.allTasks.filter((task) => taskDataId.includes(task.id));
    const userDataId = data.users.map((user) => user.userId);
    const patchTasks = tasks.map((task) => {
      const checkTask = data.tasks.find((t) => t.taskId === task.id);
      return checkTask ? { ...task, billable: checkTask.billable } : task;
    });
    const users = state.allUsers.filter((user) => userDataId.includes(user.id));
    const patchUsers = users.map((user) => {
      const checkUser = data.users.find((u) => u.userId === user.id);
      return checkUser ? { ...user, type: checkUser.type, isTemp: checkUser.isTemp } : user;
    });
    const selectUserArray = state.allUsers.filter((user) => !userDataId.includes(user.id));
    const selectTaskArray = state.allTasks.filter((task) => !taskDataId.includes(task.id));
    const formGeneral = {
      customerId: data.customerId,
      name: data.name,
      code: data.code,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      note: data.note,
      status: !!data.status,
      projectType: data.projectType
    };
    const notification = {
      komuChannelId: data.komuChannelId,
      isNoticeKMSubmitTS: data.isNoticeKMSubmitTS,
      isNoticeKMRequestOffDate: data.isNoticeKMRequestOffDate,
      isNoticeKMApproveRequestOffDate: data.isNoticeKMApproveRequestOffDate,
      isNoticeKMRequestChangeWorkingTime: data.isNoticeKMRequestChangeWorkingTime,
      isNoticeKMApproveChangeWorkingTime: data.isNoticeKMApproveChangeWorkingTime
    };
    if (state.allTasks.length > 0 && state.allUsers.length > 0) {
      dispatchForm(setFormGeneral(formGeneral));
      dispatchForm(patchTeamData({ users: patchUsers, selectUserArray }));
      dispatchForm(patchTaskData({ tasks: patchTasks, selectTaskArray }));
      dispatchForm(setFormNotification(notification));
    }
  }

  useEffect(() => {
    if (id) {
      getProjectById(+id)
        .then((data) => {
          patchDataEditProject(data);
        })
        .catch(() => toast.error('There are something wrong'));
    }
  }, [state.allTasks, state.allUsers]);
  return (
    <>
      <Card className='card-header-project'>
        <h3>Create Project</h3>
      </Card>
      <div className={cx('wrapper-content')}>
        <Steps current={state.currentStep} items={items} />
        <div className={cx('main-content-outlet')}>
          {isLoading && (
            <Space direction='vertical' className='loading'>
              <Spin tip='Loading' size='large'>
                <div className='content' />
              </Spin>
            </Space>
          )}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CreateOrEditProject;
