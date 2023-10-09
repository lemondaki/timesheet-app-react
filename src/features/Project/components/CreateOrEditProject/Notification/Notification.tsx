import React, { useEffect } from 'react';
import { Button, Checkbox, Input } from 'antd';
import { useFormContext } from '../../../../../context/FormContext/FormProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { nextStepForm, prevStepForm, setFormNotification } from '../../../../../context/FormContext/FormAction';
import { INotification } from '../../../../../context/FormContext/Form.interface';
import { schemaNotification } from '../../../../../helper/schema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigateRoute } from '../../../../../helper/navigateRoute';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
const cx = classNames.bind(styles);
const Notification = (): JSX.Element => {
  const {
    dispatchForm,
    state: { notification }
  } = useFormContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const prevRoute = useNavigateRoute('task');
  const nextRoute = useNavigateRoute('completed');
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm<INotification>({
    resolver: yupResolver(schemaNotification)
  });
  const handlePrevStep: SubmitHandler<INotification> = (data: INotification) => {
    dispatchForm(setFormNotification(data));
    dispatchForm(prevStepForm());
    navigate(prevRoute);
  };

  const handleNextStep: SubmitHandler<INotification> = (data: INotification) => {
    if (isValid) {
      dispatchForm(setFormNotification(data));
      dispatchForm(nextStepForm());
      navigate(nextRoute);
    }
  };

  useEffect(() => {
    if (id) {
      setValue('komuChannelId', notification.komuChannelId);
      setValue('isNoticeKMSubmitTS', notification.isNoticeKMSubmitTS);
      setValue('isNoticeKMRequestOffDate', notification.isNoticeKMRequestOffDate);
      setValue('isNoticeKMApproveRequestOffDate', notification.isNoticeKMApproveRequestOffDate);
      setValue('isNoticeKMApproveChangeWorkingTime', notification.isNoticeKMApproveChangeWorkingTime);
    }
  }, [notification]);
  return (
    <form>
      <div className={cx('wrapper-controller')}>
        <Controller
          name='komuChannelId'
          control={control}
          defaultValue={notification.komuChannelId}
          render={({ field }) => <Input className={cx('input-box')} {...field} placeholder='KUMO CHANEL' />}
        />
        <Controller
          name='isNoticeKMSubmitTS'
          control={control}
          defaultValue={notification.isNoticeKMSubmitTS}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
              Submit timesheet
            </Checkbox>
          )}
        />
        <Controller
          name='isNoticeKMRequestOffDate'
          control={control}
          defaultValue={notification.isNoticeKMRequestOffDate}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
              Request Off/Remote/Onsite/Đi muộn, về sớm
            </Checkbox>
          )}
        />
        <Controller
          name='isNoticeKMApproveRequestOffDate'
          control={control}
          defaultValue={notification.isNoticeKMApproveRequestOffDate}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
              Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm
            </Checkbox>
          )}
        />
        <Controller
          name='isNoticeKMRequestChangeWorkingTime'
          defaultValue={notification.isNoticeKMRequestChangeWorkingTime}
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
              Request Change Working Time
            </Checkbox>
          )}
        />
        <Controller
          name='isNoticeKMApproveChangeWorkingTime'
          defaultValue={notification.isNoticeKMApproveChangeWorkingTime}
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
              Approve/Reject Change Working Time
            </Checkbox>
          )}
        />
      </div>
      <div className='wrapper-button-footer-form'>
        <Button onClick={handleSubmit(handlePrevStep)} htmlType='submit'>
          Back
        </Button>
        <Button onClick={handleSubmit(handleNextStep)} type='primary' htmlType='submit'>
          Next
        </Button>
      </div>
    </form>
  );
};

export default Notification;
