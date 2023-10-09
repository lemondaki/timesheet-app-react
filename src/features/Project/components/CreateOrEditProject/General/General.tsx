import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, Checkbox, Button } from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './General.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormGeneral, IProjectType, ISelectCustomerDto } from '../../../interface/project.interface';
import { schemaGeneral } from '../../../../../helper/schema';
import { useFormContext } from '../../../../../context/FormContext/FormProvider';
import { nextStepForm, setFormGeneral } from '../../../../../context/FormContext/FormAction';
import { getAllCustomer } from '../../../service/project.api';
import { EProjectType, EProjectTypeValue } from '../../../../../enum/project.enum';
import { useNavigateRoute } from '../../../../../helper/navigateRoute';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
const projectType: IProjectType[] = [
  { projectTypeId: EProjectTypeValue.TM, typeName: EProjectType.TM },
  {
    projectTypeId: EProjectTypeValue.FIXEDPRICE,
    typeName: EProjectType.FIXEDPRICE
  },
  {
    projectTypeId: EProjectTypeValue.NONBILLABLE,
    typeName: EProjectType.NONBILLABLE
  },
  { projectTypeId: EProjectTypeValue.ODC, typeName: EProjectType.ODC },
  {
    projectTypeId: EProjectTypeValue.PRODUCT,
    typeName: EProjectType.PRODUCT
  },
  {
    projectTypeId: EProjectTypeValue.TRAINING,
    typeName: EProjectType.TRAINING
  },
  {
    projectTypeId: EProjectTypeValue.NOSALLARY,
    typeName: EProjectType.NOSALLARY
  }
];
const General = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const nextRoute = useNavigateRoute('team');
  const [customer, setCustomer] = useState<ISelectCustomerDto[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormGeneral>({
    resolver: yupResolver(schemaGeneral)
  });

  function fetchCustomer(): void {
    getAllCustomer()
      .then((data) => {
        setCustomer(data);
      })
      .catch(() => toast.error('There are something wrong'));
  }

  useEffect(() => {
    fetchCustomer();
  }, []);

  const onSubmitForm: SubmitHandler<IFormGeneral> = (data: IFormGeneral) => {
    if (Object.keys(errors).length === 0) {
      dispatchForm(nextStepForm());
      dispatchForm(setFormGeneral(data));
      navigate(nextRoute);
    }
  };

  const {
    dispatchForm,
    state: { formGeneral }
  } = useFormContext();
  useEffect(() => {
    if (id) {
      setValue('name', formGeneral.name);
      setValue('code', formGeneral.code);
      setValue('customerId', formGeneral.customerId);
      setValue('note', formGeneral.note === null ? '' : formGeneral.note);
      setValue('timeEnd', formGeneral.timeEnd);
      setValue('timeStart', formGeneral.timeStart);
      setValue('status', !!formGeneral.status);
      setValue('projectType', formGeneral.projectType);
    }
  }, [formGeneral]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={cx('form-filed-item')}>
        <span>Client*</span>
        <Controller
          name='customerId'
          control={control}
          defaultValue={formGeneral.customerId}
          render={({ field }) => (
            <Select
              placeholder='Choose a client'
              className={cx('input-select-client', 'custom-input-field')}
              {...field}
            >
              {customer.map(({ id, name }) => (
                <Select.Option key={id} value={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </div>
      <div className={cx('form-filed-item')}>
        <span>Project name*</span>
        <Controller
          name='name'
          control={control}
          defaultValue={formGeneral.name}
          render={({ field }) => (
            <div className={cx('wrapper-filed-render')}>
              <Input className={cx('input-select-client')} placeholder='Project name' {...field} />
              <p className='error-field'>{errors?.name?.message}</p>
            </div>
          )}
        />
      </div>
      <div className={cx('form-filed-item')}>
        <span>Project code*</span>
        <Controller
          name='code'
          control={control}
          defaultValue={formGeneral.code}
          render={({ field }) => (
            <div className={cx('wrapper-filed-render')}>
              <Input className={cx('input-select-client')} placeholder='Project code' {...field} />
              <p className='error-field'>{errors?.code?.message}</p>
            </div>
          )}
        />
      </div>
      <div className={cx('form-filed-item', 'custom-form-date')}>
        <span>Date*</span>
        <div className={cx('wrapper-form-date')}>
          <Controller
            name='timeStart'
            control={control}
            defaultValue={formGeneral.timeStart}
            render={({ field }) => (
              <div className={cx('wrapper-filed-render')}>
                <DatePicker
                  placeholder='timeStart'
                  className={cx('custom-input-field', 'input-select-client')}
                  onChange={(date, timeString) => {
                    formGeneral.timeStart = timeString;
                    field.onChange(date);
                  }}
                  value={!formGeneral.timeStart ? undefined : dayjs(new Date(formGeneral.timeStart))}
                />
                <p className='error-field'>{errors?.timeStart?.message}</p>
              </div>
            )}
          />
          <Controller
            name='timeEnd'
            control={control}
            defaultValue={formGeneral.timeEnd}
            render={({ field }) => (
              <div className={cx('wrapper-filed-render')}>
                <DatePicker
                  placeholder='timeEnd'
                  className={cx('input-select-client', 'custom-input-field')}
                  onChange={(date, timeString) => {
                    formGeneral.timeEnd = timeString;
                    field.onChange(date);
                  }}
                  value={!formGeneral.timeEnd ? undefined : dayjs(new Date(formGeneral.timeEnd))}
                />
                <p className='error-field'>{errors?.timeEnd?.message}</p>
              </div>
            )}
          />
        </div>
      </div>
      <div className={cx('form-filed-item')}>
        <span>Note</span>
        <Controller
          name='note'
          control={control}
          defaultValue={formGeneral.note}
          render={({ field }) => (
            <>
              <Input placeholder='Leave a comment' className={cx('input-select-client')} {...field} />
            </>
          )}
        />
      </div>
      <div className={cx('form-filed-checkbox')}>
        <span>All user</span>
        <Controller
          name='status'
          control={control}
          defaultValue={formGeneral.status}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
              <p>Auto add user as a member of this project when creating new user</p>
            </Checkbox>
          )}
        />
      </div>
      <div className={cx('form-filed-item')}>
        <span>Project Type*</span>
        <Controller
          name='projectType'
          control={control}
          defaultValue={formGeneral.projectType}
          render={({ field }) => (
            <Select
              placeholder='Choose a project type...'
              className={cx('input-select-client', 'custom-input-field')}
              {...field}
            >
              {projectType.map(({ projectTypeId, typeName }) => (
                <Select.Option key={projectTypeId} value={projectTypeId}>
                  {typeName}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </div>
      <div className={cx('btn-next')}>
        <Button type='primary' htmlType='submit'>
          Next
        </Button>
      </div>
    </form>
  );
};

export default General;
