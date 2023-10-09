import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Tabs } from 'antd';
import classNames from 'classnames/bind';
import styles from './View.module.scss';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import ViewTeam from './ViewTeam/ViewTeam';
import ViewTask from './ViewTask/ViewTask';
import { ITimeStatisticMemberDto, ITimeStatisticTaskDto } from '../../interface/project.interface';
import { EViewTimeSelect } from '../../../../enum/project.enum';
import {
  formatMonth,
  formatQuarter,
  formatWeek,
  formatYear,
  getTimeOfMonth,
  getTimeOfQuater,
  getTimeOfWeek,
  getTimeOfYear
} from '../../../../helper/formatTime';
import { addMonths, addQuarters, addWeeks, addYears, subMonths, subQuarters, subWeeks, subYears } from 'date-fns';
import { getTimesheetStatisticTasks, getTimesheetStatisticTeams } from '../../service/project.api';
import { useAppContext } from '../../../../context/ProjectContext/ProjectProvider';
import { setOpenCustomTime, setOpenModalView } from '../../../../context/ProjectContext/ProjectAction';
import CustomTime from './CustomTime/CustomTime';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

let currentDate = new Date();
const View = (): JSX.Element => {
  const {
    state: { selectProjectItem, isOpenCustomTime, isOpenModalView },
    dispatch
  } = useAppContext();
  const initTimeTitle = `${EViewTimeSelect.WEEK}: ${formatWeek(currentDate)}`;
  const initTimeValue = getTimeOfWeek(currentDate);
  const [timeState, setTimeState] = useState({
    timeTitle: initTimeTitle,
    timeValue: {
      startTime: initTimeValue.startTime,
      endTime: initTimeValue.endTime
    }
  });
  const { startTime, endTime } = timeState.timeValue;
  const [viewTask, setViewTask] = useState<ITimeStatisticTaskDto[]>([]);
  const [viewTeam, setViewTeam] = useState<ITimeStatisticMemberDto[]>([]);
  useEffect(() => {
    getTimesheetStatisticTeams(selectProjectItem.id, startTime, endTime)
      .then((res) => {
        setViewTeam(res);
      })
      .catch(() => toast.error('There are something wrong'));
    getTimesheetStatisticTasks(selectProjectItem.id, startTime, endTime)
      .then((res) => {
        setViewTask(res);
      })
      .catch(() => toast.error('There are something wrong'));
  }, [timeState]);

  function handleNextTime(): void {
    if (timeState.timeTitle.includes(EViewTimeSelect.WEEK)) {
      currentDate = addWeeks(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.WEEK}: ${formatWeek(currentDate)}`,
        timeValue: getTimeOfWeek(currentDate)
      });
    }
    if (timeState.timeTitle.includes(EViewTimeSelect.MONTH)) {
      currentDate = addMonths(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.MONTH}: ${formatMonth(currentDate)}`,
        timeValue: getTimeOfMonth(currentDate)
      });
    }
    if (timeState.timeTitle.includes(EViewTimeSelect.QUATER)) {
      currentDate = addQuarters(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.QUATER}: ${formatQuarter(currentDate)}`,
        timeValue: getTimeOfQuater(currentDate)
      });
    }
    if (timeState.timeTitle.includes(EViewTimeSelect.YEAR)) {
      currentDate = addYears(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.YEAR}: ${formatYear(currentDate)}`,
        timeValue: getTimeOfYear(currentDate)
      });
    }
  }

  function handlePrevTime(): void {
    if (timeState.timeTitle.includes(EViewTimeSelect.WEEK)) {
      currentDate = subWeeks(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.WEEK}: ${formatWeek(currentDate)}`,
        timeValue: getTimeOfWeek(currentDate)
      });
    }
    if (timeState.timeTitle.includes(EViewTimeSelect.MONTH)) {
      currentDate = subMonths(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.MONTH}: ${formatMonth(currentDate)}`,
        timeValue: getTimeOfMonth(currentDate)
      });
    }
    if (timeState.timeTitle.includes(EViewTimeSelect.QUATER)) {
      currentDate = subQuarters(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.QUATER}: ${formatQuarter(currentDate)}`,
        timeValue: getTimeOfQuater(currentDate)
      });
    }
    if (timeState.timeTitle.includes(EViewTimeSelect.YEAR)) {
      currentDate = subYears(currentDate, 1);
      setTimeState({
        timeTitle: `${EViewTimeSelect.YEAR}: ${formatYear(currentDate)}`,
        timeValue: getTimeOfYear(currentDate)
      });
    }
  }

  function handleChangeSelect(e: string): void {
    if (timeState.timeTitle.includes(e) && !timeState.timeTitle.includes(EViewTimeSelect.CUSTOM_TIME)) {
      return;
    }
    switch (e) {
      case EViewTimeSelect.MONTH:
        setTimeState({
          timeTitle: `${e}: ${formatMonth(currentDate)}`,
          timeValue: getTimeOfMonth(currentDate)
        });
        break;
      case EViewTimeSelect.QUATER:
        setTimeState({
          timeTitle: `${e}: ${formatQuarter(currentDate)}`,
          timeValue: getTimeOfQuater(currentDate)
        });
        break;
      case EViewTimeSelect.YEAR:
        setTimeState({
          timeTitle: `${e}: ${formatYear(currentDate)}`,
          timeValue: getTimeOfYear(currentDate)
        });
        break;
      case EViewTimeSelect.ALL_TIME:
        setTimeState({
          timeTitle: e,
          timeValue: {
            startTime: '',
            endTime: ''
          }
        });
        break;
      case EViewTimeSelect.CUSTOM_TIME:
        dispatch(setOpenCustomTime(true));
        break;
      default:
        setTimeState({
          timeTitle: `${e}: ${formatWeek(currentDate)}`,
          timeValue: getTimeOfWeek(currentDate)
        });
    }
  }
  return (
    <Modal centered closeIcon={null} open={isOpenModalView} width={900} className={cx('view', 'main-view')}>
      <div className={cx('wrapper-close')}>
        <Button
          onClick={() => {
            dispatch(setOpenModalView(false));
            currentDate = new Date();
          }}
          icon={<CloseOutlined />}
        ></Button>
      </div>
      <header>
        <div className={cx('header-left')}>
          <Button icon={<LeftOutlined />} onClick={handlePrevTime}></Button>
          <Button icon={<RightOutlined />} onClick={handleNextTime}></Button>
          <h3>{timeState.timeTitle}</h3>
        </div>
        <div className={cx('header-right')}>
          <Select
            defaultValue={EViewTimeSelect.WEEK}
            className={cx('select-time')}
            options={[
              { value: EViewTimeSelect.WEEK, label: 'Week' },
              { value: EViewTimeSelect.MONTH, label: 'Month' },
              { value: EViewTimeSelect.QUATER, label: 'Quater' },
              { value: EViewTimeSelect.YEAR, label: 'Year' },
              { value: EViewTimeSelect.ALL_TIME, label: 'All Time' },
              { value: EViewTimeSelect.CUSTOM_TIME, label: 'Custom Time' }
            ]}
            onSelect={handleChangeSelect}
          />
          <Button type='primary'>Export</Button>
        </div>
      </header>
      <Tabs
        defaultActiveKey='1'
        size='large'
        className={cx('tabs', 'view-tab')}
        items={[
          { label: 'Team', key: '0', children: <ViewTeam data={viewTeam} /> },
          { label: 'Tasks', key: '1', children: <ViewTask data={viewTask} /> }
        ]}
      />
      {isOpenCustomTime && <CustomTime setTimeState={setTimeState} />}
    </Modal>
  );
};

export default View;
