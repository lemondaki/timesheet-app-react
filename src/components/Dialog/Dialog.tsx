import React from 'react';
import { Modal } from 'antd';
import { useAppContext } from '../../context/ProjectContext/ProjectProvider';
import { getAllProjectsAction, setLoading, setOpenModalDialog } from '../../context/ProjectContext/ProjectAction';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  ActiveProject,
  DeActiveProject,
  DeleteProject,
  GetAllProject
} from '../../features/Project/service/project.api';
import { formatProjectData } from '../../helper/formatTime';
import { toast } from 'react-toastify';
import styles from './Dialog.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Dialog = (): JSX.Element => {
  const {
    dispatch,
    state: { filterProjectNumber, searchTextProject, isOpenModalDialog, titleAction, selectProjectItem }
  } = useAppContext();

  const handleSaveDialog = (): void => {
    dispatch(setOpenModalDialog(false));
    dispatch(setLoading(true));
    if (titleAction === 'Delete') {
      DeleteProject(selectProjectItem.id)
        .then(async () => await GetAllProject(filterProjectNumber, searchTextProject))
        .then((res) => {
          dispatch(getAllProjectsAction(formatProjectData(res)));
          toast.success('Delete Project successfully!');
          dispatch(setLoading(false));
        })
        .catch((error) => {
          toast.error(error.response.data.error.message);
          dispatch(setLoading(false));
        });
    }
    if (titleAction === 'Active') {
      ActiveProject(selectProjectItem.id)
        .then(async () => await GetAllProject(filterProjectNumber, searchTextProject))
        .then((res) => {
          dispatch(getAllProjectsAction(formatProjectData(res)));
          toast.success('Active Project successfully!');
          dispatch(setLoading(false));
        })
        .catch((error) => {
          toast.error(error.response.data.error.message);
          dispatch(setLoading(false));
        });
    }
    if (titleAction === 'Deactive') {
      DeActiveProject(selectProjectItem.id)
        .then(async () => await GetAllProject(filterProjectNumber, searchTextProject))
        .then((res) => {
          dispatch(getAllProjectsAction(formatProjectData(res)));
          toast.success('Deactive Project successfully!');
          dispatch(setLoading(false));
        })
        .catch((error) => {
          toast.error(error.response.data.error.message);
          dispatch(setLoading(false));
        });
    }
  };

  const handleCancelDialog = (): void => {
    dispatch(setOpenModalDialog(false));
  };

  return (
    <Modal open={isOpenModalDialog} centered onOk={handleSaveDialog} onCancel={handleCancelDialog}>
      <p className={cx('header-icon')}>
        <ExclamationCircleOutlined className={cx('icon-circle')} />
      </p>
      <h2>Are you sure?</h2>
      <p className={cx('action-title')}>
        {titleAction} project: `{selectProjectItem.name}`?
      </p>
    </Modal>
  );
};

export default Dialog;
