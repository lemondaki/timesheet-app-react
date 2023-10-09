import React from 'react';
import HeaderProject from './HeaderProject/HeaderProject';
import ProjectList from './ProjectList/ProjectList';
import { Space, Spin } from 'antd';
import Dialog from '../../../../components/Dialog/Dialog';
import { useAppContext } from '../../../../context/ProjectContext/ProjectProvider';
import View from '../View/View';
const MainProject = (): JSX.Element => {
  const {
    state: { isLoading }
  } = useAppContext();
  const {
    projectsData: { allClients, allProjectsByClient },
    isOpenModalView
  } = useAppContext().state;
  return (
    <div>
      <HeaderProject />
      {isLoading && (
        <Space direction='vertical' className='loading'>
          <Spin tip='Loading' size='large'>
            <div className='content' />
          </Spin>
        </Space>
      )}
      <ProjectList allClients={allClients} allProjectsByClient={allProjectsByClient} />
      <Dialog />
      {isOpenModalView && <View />}
    </div>
  );
};
export default MainProject;
