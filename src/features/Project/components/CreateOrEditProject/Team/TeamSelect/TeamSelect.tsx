import React, { useEffect, useState } from 'react';
import { Collapse, Select } from 'antd';
import TeamMemberItem from '../TeamMemberItem/TeamMemberItem';
import { useFormContext } from '../../../../../../context/FormContext/FormProvider';
import { LeftOutlined } from '@ant-design/icons';
import { selectUserMember } from '../../../../../../context/FormContext/FormAction';
import { IGetUserDto } from '../../../../interface/project.interface';
import Search, { SearchProps } from 'antd/es/input/Search';
import classNames from 'classnames/bind';
import styles from './TeamSelect.module.scss';
import { FixedSizeList as List } from 'react-window';
// import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
const cx = classNames.bind(styles);
const TeamSelect = (): JSX.Element => {
  // const listRef = useRef<any>(null);
  // const hasMountedRef = useRef<any>(false);
  const { selectUserArray } = useFormContext().state;
  const [filterSelectUser, setFilterSelectUser] = useState<IGetUserDto[]>([]);
  const { dispatchForm } = useFormContext();
  useEffect(() => {
    setFilterSelectUser(selectUserArray);
  }, [selectUserArray]);
  console.log(filterSelectUser);
  // useEffect(() => {
  //   if (hasMountedRef.current && listRef.current) {
  //     listRef.current.resetloadMoreItemsCache();
  //   }
  //   hasMountedRef.current = true;
  // }, [filterSelectUser.length]);

  function handleSelectUserMember(userMember: IGetUserDto): void {
    dispatchForm(selectUserMember(userMember));
  }

  const handleSearch: SearchProps['onSearch'] = (value) => {
    const filterUser = selectUserArray.filter((user) => user.emailAddress.includes(value) || user.name.includes(value));
    setFilterSelectUser(filterUser);
  };

  // const LOADING = 1;
  // const LOADED = 2;
  // const itemStatusMap: any = {};

  // const isItemLoaded = (index: number): boolean => !!itemStatusMap[index];
  // const loadMoreItems = async (startIndex: number, stopIndex: number): Promise<void> => {
  //   for (let index = startIndex; index <= stopIndex; index++) {
  //     itemStatusMap[index] = LOADING;
  //   }
  //   return await new Promise<void>((resolve) =>
  //     setTimeout(() => {
  //       for (let index = startIndex; index <= stopIndex; index++) {
  //         itemStatusMap[index] = LOADED;
  //       }
  //       resolve();
  //     }, 1500)
  //   );
  // };

  const Row = ({ index, style }: { index: number; style: any }): JSX.Element => {
    // let label;
    // if (itemStatusMap[index] === LOADED) {
    //   label = (
    //     <TeamMemberItem
    //       key={selectUserArray[index].id}
    //       onSelect={() => handleSelectUserMember(selectUserArray[index])}
    //       icon={<LeftOutlined />}
    //       userMember={selectUserArray[index]}
    //     />
    //   );
    // } else {
    //   label = (
    //     <Space className={cx('wrapper-space')}>
    //       <Skeleton.Avatar active={true} size={'large'} shape={'circle'} />
    //       <Skeleton.Input active={true} size={'large'} block={true} />
    //     </Space>
    //   );
    // }
    return (
      <div style={style}>
        <TeamMemberItem
          key={selectUserArray[index].id}
          onSelect={() => handleSelectUserMember(selectUserArray[index])}
          icon={<LeftOutlined />}
          userMember={selectUserArray[index]}
        />
      </div>
    );
  };
  return (
    <Collapse className={cx('teamselect-collapse')}>
      <Collapse.Panel header='Team Select Member' key='1'>
        <div className={cx('teamselect-header')}>
          <Select
            defaultValue={1}
            className={cx('select-position')}
            options={[
              { value: 0, label: 'Member' },
              { value: 1, label: 'All' },
              { value: 2, label: 'Shadow' },
              { value: 3, label: 'Deactive' }
            ]}
          />
          <Select
            defaultValue={1}
            className={cx('select-position')}
            options={[
              { value: 0, label: 'Member' },
              { value: 1, label: 'All' },
              { value: 2, label: 'Shadow' },
              { value: 3, label: 'Deactive' }
            ]}
          />
          <Search className={cx('search-box')} onSearch={handleSearch} placeholder='search member' />
        </div>
        <div className={cx('teamselect-list')}>
        </div>
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List height={290} itemCount={selectUserArray.length} itemSize={68} width={width}>
                {Row}
              </List>
            )}
          </AutoSizer>
      </Collapse.Panel>
    </Collapse>
  );
};

export default TeamSelect;
