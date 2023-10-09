import React from 'react';
import { Button, DatePicker, Modal } from 'antd';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext } from '../../../../../context/ProjectContext/ProjectProvider';
import { setOpenCustomTime } from '../../../../../context/ProjectContext/ProjectAction';
import { format } from 'date-fns';
import { ICustomTimeState } from '../../../interface/project.interface';
import classNames from 'classnames/bind';
import styles from './CustomTime.module.scss';
interface ICustomTime {
  startDate: string;
  endDate: string;
}
const cx = classNames.bind(styles);
const schema = yup
  .object({
    startDate: yup.string().required('StartTime is a required field'),
    endDate: yup.string().required('EndTime is a required field')
  })
  .required();

interface typeProps {
  setTimeState: React.Dispatch<React.SetStateAction<ICustomTimeState>>;
}
const CustomTime = ({ setTimeState }: typeProps): JSX.Element => {
  const { dispatch } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleCancel(): void {
    dispatch(setOpenCustomTime(false));
  }

  const onSubmitForm: SubmitHandler<ICustomTime> = (data: ICustomTime) => {
    dispatch(setOpenCustomTime(false));
    setTimeState({
      timeTitle: `Custom Time: ${format(new Date(data.startDate), 'dd/MMM/yyy')} - ${format(
        new Date(data.endDate),
        'dd/MMM/yyy'
      )}`,
      timeValue: {
        startTime: format(new Date(data.startDate), 'yyy/MM/dd'),
        endTime: format(new Date(data.endDate), 'yyy/MM/dd')
      }
    });
  };

  return (
    <Modal className={cx('custom-time', 'modal')} width={350} title='Custom Time' open={true}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Controller
          name='startDate'
          control={control}
          render={({ field }) => (
            <div className={cx('wrap-datepicker')}>
              <DatePicker
                placeholder='From Date*'
                className={cx('datepicker')}
                onChange={(date) => field.onChange(date)}
              />
              <p className='error-field'>{errors?.startDate?.message}</p>
            </div>
          )}
        />
        <Controller
          name='endDate'
          control={control}
          render={({ field }) => (
            <div className={cx('wrap-datepicker')}>
              <DatePicker
                placeholder='End Date*'
                className={cx('datepicker')}
                onChange={(date) => field.onChange(date)}
              />
              <p className='error-field'>{errors?.endDate?.message}</p>
            </div>
          )}
        />
        <footer>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button htmlType='submit' type='primary'>
            Save
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

export default CustomTime;
