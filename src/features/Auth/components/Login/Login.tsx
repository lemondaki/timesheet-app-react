import React from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Checkbox, Button, Spin, Space } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IAuthenticateModel } from '../../interface/login.interface';
import { login, setAccessTokenLocalStorage } from '../../service/auth.service';
import { useAppContext } from '../../../../context/ProjectContext/ProjectProvider';
import { setAccessToken, setLoading } from '../../../../context/ProjectContext/ProjectAction';
const cx = classNames.bind(styles);
const schema = yup
  .object({
    userNameOrEmailAddress: yup.string().required('*Username is required'),
    password: yup.string().required('*Password is required').min(5, '*Minimum password 5 characters'),
    rememberClient: yup.boolean().default(false)
  })
  .required();
const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    state: { isLoading },
    dispatch
  } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuthenticateModel>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IAuthenticateModel> = async (data: IAuthenticateModel) => {
    dispatch(setLoading(true));
    login(data)
      .then((response) => {
        setAccessTokenLocalStorage(response.result.accessToken);
        dispatch(setAccessToken(response.result.accessToken));
        navigate('/project');
        toast.success('Login successfully!');
        dispatch(setLoading(false));
      })
      .catch((error) => {
        toast.error(error.response?.data.error.details);
        dispatch(setLoading(false));
      });
  };
  if (isLoading) {
    return (
      <div className={cx('login')}>
        <Space direction='vertical' className='loading'>
          <Spin tip='Loading' size='large'>
            <div className='content' />
          </Spin>
        </Space>
      </div>
    );
  }
  return (
    <div className={cx('login')}>
      <form className={cx('login__form')} onSubmit={handleSubmit(onSubmit)}>
        <h4>Log In TimeSheet</h4>
        <Controller
          name='userNameOrEmailAddress'
          control={control}
          render={({ field }) => (
            <Input {...field} size='large' placeholder='username or email' prefix={<UserOutlined />} />
          )}
        />
        <p className={cx('error')}>{errors.userNameOrEmailAddress?.message}</p>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              size='large'
              placeholder='password'
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          )}
        />
        <p className={cx('error')}>{errors.password?.message}</p>
        <Controller
          name='rememberClient'
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              Remember me
            </Checkbox>
          )}
        />
        <Button type='primary' size='large' htmlType='submit'>
          Submit
        </Button>
        <p className={cx('description')}>© 2023 Timesheet. Version 4.3.0.0 [20221606]</p>
      </form>
    </div>
  );
};

export default Login;
