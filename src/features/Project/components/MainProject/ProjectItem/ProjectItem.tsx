import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './ProjectItem.module.scss';
import { Badge, Button, Dropdown, Tag } from 'antd';
import {
  CaretDownOutlined,
  EditOutlined,
  EyeOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { IGetProjectDto } from '../../../interface/project.interface';
import { formatDateTime } from '../../../../../helper/formatTime';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../../../context/ProjectContext/ProjectProvider';
import {
  getSelectProjectItem,
  setOpenModalDialog,
  setOpenModalView,
  setTitleActionModal
} from '../../../../../context/ProjectContext/ProjectAction';
import { formatProjectType } from '../../../../../helper/transform';
const cx = classNames.bind(styles);
const ProjectItem = ({ projectItem }: { projectItem: IGetProjectDto }): JSX.Element => {
  const { dispatch } = useAppContext();
  const iconRender =
    projectItem.status === 0 ? (
      <>
        <CloseOutlined /> Deactive
      </>
    ) : (
      <>
        <CheckOutlined /> Active
      </>
    );

  function handleOpenModalView(): void {
    dispatch(setOpenModalView(true));
    dispatch(getSelectProjectItem(projectItem));
  }

  return useMemo(() => {
    return (
      <div className={cx('project-item')}>
        <div className={cx('left-projectItem')}>
          <span>{projectItem.name}</span>
          <Badge count={projectItem.pms.slice(0, 3).join(', ')} showZero color='#2e95ea' />
          <Badge count={projectItem.activeMember} showZero color='#f44336' />
          <Badge count={formatProjectType(projectItem.projectType)} showZero color='#f89c26' />
          <Badge
            count={`${formatDateTime(projectItem.timeStart)}${
              !projectItem.timeEnd ? '' : ' - ' + formatDateTime(projectItem.timeEnd)
            }`}
            showZero
            color='#4caf50'
          />
        </div>
        <div className={cx('right-projectItem')}>
          {projectItem.status === 0 ? <Tag color='#4caf50'>Active</Tag> : <Tag color='#9e9e9e'>Deactive</Tag>}
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <Link to={`/project/edit/${projectItem.id}/general`}>
                      <span>
                        <EditOutlined /> Edit
                      </span>
                    </Link>
                  ),
                  key: '0'
                },
                {
                  label: (
                    <span onClick={handleOpenModalView}>
                      <EyeOutlined /> View
                    </span>
                  ),
                  key: '1'
                },
                {
                  label: (
                    <span
                      onClick={() => {
                        dispatch(setOpenModalDialog(true));
                        dispatch(getSelectProjectItem(projectItem));
                        dispatch(setTitleActionModal(projectItem.status === 0 ? 'Deactive' : 'Active'));
                      }}
                    >
                      {iconRender}
                    </span>
                  ),
                  key: '2'
                },
                {
                  label: (
                    <span
                      onClick={() => {
                        dispatch(setOpenModalDialog(true));
                        dispatch(setTitleActionModal('Delete'));
                        dispatch(getSelectProjectItem(projectItem));
                      }}
                    >
                      <DeleteOutlined /> Delete
                    </span>
                  ),
                  key: '3'
                }
              ]
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button type='primary' className={cx('btn-action')} icon={<CaretDownOutlined />}>
                Action
              </Button>
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }, [dispatch]);
};

export default React.memo(ProjectItem);
