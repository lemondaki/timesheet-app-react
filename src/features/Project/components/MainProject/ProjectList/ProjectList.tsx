import React, { memo, useRef, useState } from 'react';
// import { Card, Row } from 'antd';
import ProjectItem from '../ProjectItem/ProjectItem';
import { IGetProjectDto } from '../../../interface/project.interface';
import classNames from 'classnames/bind';
import styles from './ProjectList.module.scss';
// import { useAppContext } from '../../../../../context/ProjectContext/ProjectProvider';
// import { FixedSizeList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';
import { Card, Button, Space, Spin } from 'antd';
import { useAppContext } from '../../../../../context/ProjectContext/ProjectProvider';
const cx = classNames.bind(styles);
const ProjectList = ({
  allClients,
  allProjectsByClient
}: {
  allClients: string[];
  allProjectsByClient: IGetProjectDto[][];
}): JSX.Element => {
  const {
    state: { isLoading }
  } = useAppContext();
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [endIndex, setEndIndex] = useState(10);
  const listContainer = useRef<HTMLDivElement>(null);
  function handleLoadMore(): void {
    setLoadingMore(true);
    setTimeout(() => {
      setEndIndex((endIndex) => endIndex + 10);
      setLoadingMore(false);
    }, 1000);
  }

  function handleGotoTop(): void {
    if (listContainer.current) {
      listContainer.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  // function handleScroll(e: any): void {
  //   const { scrollTop, clientHeight, scrollHeight } = e.target;
  //   console.log(scrollHeight - scrollTop, clientHeight);
  //   if (Math.trunc(scrollHeight - scrollTop) === clientHeight) {
  //     console.log('end of footer');
  //     setLoadingMore(true);
  //     setTimeout(() => {
  //       setEndIndex((endIndex) => endIndex + 1);
  //       setLoadingMore(false);
  //     }, 1000);
  //   }
  // }
  console.log(listContainer);
  // const Row = ({ index, style }: { index: any; style: any }): JSX.Element => (
  //   // <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
  //   //   {allProjectsByClient.flatMap((project) => project)[index].name}
  //   // </div>
  //   <ProjectItem projectItem={allProjectsByClient.flatMap((project) => project)[index]}></ProjectItem>
  //   // <div><Card>{index}</Card></div>
  // );
  return (
    <div ref={listContainer} className={cx('wrapper-list')}>
      {allClients.slice(0, endIndex).map((client, index) => (
        <div className={cx('project-list', 'project-lists')} key={client}>
          <Card>{client}</Card>
          {allProjectsByClient[index].map((project) => (
            <ProjectItem key={project.id} projectItem={project} />
          ))}
        </div>
      ))}
      {isLoadingMore && (
        <Space direction='vertical' className='loading'>
          <Spin tip='Loading' size='large'>
            <div className='content' />
          </Spin>
        </Space>
      )}
      {!isLoading && !isLoadingMore && endIndex <= allClients.length && (
        <div className={cx('wrapper-btn')}>
          <Button onClick={handleLoadMore} className={cx('loadmore-btn')} type='primary'>
            Load More List...
          </Button>
        </div>
      )}
      {!isLoading && endIndex > allClients.length && (
        <div className={cx('wrapper-btn')}>
          <Button onClick={handleGotoTop} className={cx('loadmore-btn')} type='primary'>
            Go to Top
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(ProjectList);
