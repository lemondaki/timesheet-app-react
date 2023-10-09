import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { SettingOutlined, ProjectOutlined, HomeOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, ColorPicker, MenuProps, Dropdown, Space } from 'antd';
import { toast } from 'react-toastify';
import { getCurrentLoginInformation } from '../../features/Project/service/project.api';
import { useAppContext } from '../../context/ProjectContext/ProjectProvider';
import { setAccessToken, setLoading } from '../../context/ProjectContext/ProjectAction';
const { Header, Sider, Content } = Layout;
const cx = classNames.bind(styles);
interface propsType {
  onSetColor: Dispatch<SetStateAction<string>>;
}
export const LayoutUI = ({ onSetColor }: propsType): JSX.Element => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [inforUser, setUserInfor] = useState({
    avatar: '',
    username: '',
    email: ''
  });
  const {
    token: { colorText, colorPrimary }
  } = theme.useToken();
  const items: MenuProps['items'] = [
    {
      label: <span>Change Theme</span>,
      key: '0'
    },
    {
      type: 'divider'
    },
    {
      label: (
        <ColorPicker showText value={colorPrimary} onChangeComplete={(color) => onSetColor(color.toHexString())} />
      ),
      key: '3'
    }
  ];
  const handleLogout = (): void => {
    dispatch(setLoading(true));
    localStorage.removeItem('accessToken');
    dispatch(setAccessToken(null));
    navigate('/login');
    setTimeout(() => {
      toast.success('Logout successfully!');
      dispatch(setLoading(false));
    }, 1500);
  };

  useEffect(() => {
    getCurrentLoginInformation()
      .then((res) => {
        setUserInfor({ avatar: res.avatarFullPath, username: res.userName, email: res.emailAddress });
      })
      .catch(() => toast.error('There are something wrong'));
  }, []);

  return (
    <Layout className={cx('layout')}>
      <Header className={cx('header')} style={{ background: colorPrimary, color: colorText }}>
        <div className={cx('header-left')}>
          <div className={cx('logo')}>
            <img className={cx('image_logo')} src='../../asset/img/nccsoft_vietnam_logo.png' alt='logo_nccsoft' />
            <span>Timesheet</span>
          </div>
        </div>
        <div className={cx('header-right')}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <SettingOutlined className={cx('icon-setting')} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider className={cx('sider')} width='300' trigger={null} collapsible>
          <div className={cx('user-infor')}>
            <img className={cx('image_user')} src={inforUser.avatar} alt='User logo' />
            <div className={cx('user_descriptions')}>
              <p>{inforUser.username}</p>
              <p> {inforUser.email} </p>
            </div>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <div onClick={handleLogout}>
                        <LogoutOutlined /> <span>Logout</span>
                      </div>
                    ),
                    key: '0'
                  }
                ]
              }}
              trigger={['click']}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <DownOutlined className={cx('icon-dropdown')} />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Menu
            color={colorPrimary}
            className={cx('sidebar-menu')}
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: <Link to='/'>Home page</Link>
              },
              {
                key: '2',
                icon: <ProjectOutlined />,
                label: <Link to='/project'>Project</Link>
              }
            ]}
          />
        </Sider>
        <Content className={cx('main-content')}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutUI;
