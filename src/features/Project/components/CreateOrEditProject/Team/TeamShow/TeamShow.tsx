import React, { useEffect, useState } from 'react';
import { Checkbox, Collapse, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useFormContext } from '../../../../../../context/FormContext/FormProvider';
import TeamMemberItem from '../TeamMemberItem/TeamMemberItem';
import { IGetUserDto } from '../../../../interface/project.interface';
import { removeUserMember, setPositionUser } from '../../../../../../context/FormContext/FormAction';
import Search, { SearchProps } from 'antd/es/input/Search';
import classNames from 'classnames/bind';
import styles from './TeamShow.module.scss';
const cx = classNames.bind(styles);

const TeamShow = (): JSX.Element => {
  const {
    state: { users },
    dispatchForm
  } = useFormContext();
  const [filterUser, setFilterUser] = useState<IGetUserDto[]>([]);
  useEffect(() => {
    setFilterUser(users);
  }, [users]);

  function handleRemoveUserMember(user: IGetUserDto): void {
    dispatchForm(removeUserMember(user));
  }

  function handleSelectPosition(value: number, id: number): void {
    const updateUsers = users.map((user) => (user.id === id ? { ...user, type: value } : user));
    dispatchForm(setPositionUser(updateUsers));
  }

  function handleSelectIsTemp(value: boolean, id: number): void {
    const updateUsers = users.map((user) => (user.id === id ? { ...user, isTemp: value } : user));
    dispatchForm(setPositionUser(updateUsers));
  }

  const handleSearch: SearchProps['onSearch'] = (value) => {
    const filterUser = users.filter((user) => user.emailAddress.includes(value) || user.name.includes(value));
    setFilterUser(filterUser);
  };
  const positionSelect = (user: IGetUserDto): JSX.Element => (
    <>
      <Select
        defaultValue={user.type ?? 0}
        className={cx('select-position')}
        onChange={(value) => handleSelectPosition(value, user.id)}
        options={[
          { value: 0, label: 'Member' },
          { value: 1, label: 'PM' },
          { value: 2, label: 'Shadow' },
          { value: 3, label: 'Deactive' }
        ]}
      />
      <Select
        defaultValue={user.isTemp}
        className={cx('select-position')}
        onChange={(value) => handleSelectIsTemp(value, user.id)}
        options={[
          { value: true, label: 'Temp' },
          { value: false, label: 'Official' }
        ]}
      />
    </>
  );

  return (
    <Collapse className={cx('teamshow-collapse')}>
      <Collapse.Panel header='Team' key='1'>
        <div className={cx('header-team-show', 'teamshow-header')}>
          <Checkbox>Show deactive member</Checkbox>
          <Search className={cx('seacrh-box')} onSearch={handleSearch} placeholder='search member' />
        </div>
        <div className={cx('teamshow-list')}>
          {filterUser.map((user) => (
            <TeamMemberItem
              key={user.id}
              onClick={() => handleRemoveUserMember(user)}
              select={positionSelect(user)}
              icon={<CloseOutlined className={cx('icon-close')} />}
              userMember={user}
            />
          ))}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default TeamShow;
