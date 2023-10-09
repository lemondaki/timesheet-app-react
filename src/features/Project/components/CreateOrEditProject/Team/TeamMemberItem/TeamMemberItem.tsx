import React, { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './TeamMemberItem.module.scss';
import { Badge } from 'antd';
import { IGetUserDto } from '../../../../interface/project.interface';
import { formatColorLevel, formatLevelType } from '../../../../../../helper/transform';
const cx = classNames.bind(styles);
const TeamMemberItem = ({
  userMember,
  onClick,
  onSelect,
  icon,
  select
}: {
  userMember: IGetUserDto;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  onSelect?: MouseEventHandler<HTMLSpanElement>;
  icon: JSX.Element;
  select?: JSX.Element;
}): JSX.Element => {
  return (
    <div className={cx('team-member-item')} onClick={onSelect}>
      <div className={cx('team-member-content')}>
        <span onClick={onClick}>{icon}</span>
        <img className={cx('member-image')} src={userMember.avatarFullPath} alt='Member' />
        <div className={cx('member-infor')}>
          <div className={cx('wrapper-name')}>
            <span className={cx('member-name')}>{userMember.name}</span>
            <Badge
              className={cx('badge')}
              count={userMember.branchDisplayName ?? 'HN1'}
              showZero
              color={userMember.branchColor ?? '#f44336'}
            />
            <Badge
              className={cx('badge')}
              count={formatLevelType(userMember.type)}
              showZero
              color={formatColorLevel(userMember.type)}
            />
          </div>
          <span className={cx('member-email')}>{userMember.emailAddress}</span>
        </div>
      </div>
      {select}
    </div>
  );
};

export default TeamMemberItem;
