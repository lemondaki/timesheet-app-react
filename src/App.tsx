import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/Auth/components/Login/Login';
import { RequireAuth } from './features/Auth/components/RequireAuth/RequireAuth';
import LayoutUI from './components/Layout/Layout';
import { ConfigProvider } from 'antd';
import MainProject from './features/Project/components/MainProject/MainProject';
import General from './features/Project/components/CreateOrEditProject/General/General';
import CreateOrEditProject from './features/Project/components/CreateOrEditProject/CreateOrEditProject';
import Team from './features/Project/components/CreateOrEditProject/Team/Team';
import Task from './features/Project/components/CreateOrEditProject/Task/Task';
import Notification from './features/Project/components/CreateOrEditProject/Notification/Notification';
import { FormProvider } from './context/FormContext/FormProvider';
import Completed from './features/Project/components/CreateOrEditProject/Completed/Completed';
function App(): JSX.Element {
  const [primaryColor, setPrimaryColor] = useState('#3949AB');
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          colorError: 'red',
          fontSize: 16
        }
      }}
    >
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth redirectTo='/login'>
                <LayoutUI onSetColor={setPrimaryColor}></LayoutUI>
              </RequireAuth>
            }
          >
            <Route path='' element={<Navigate to='project' />} />
            <Route path='project' element={<MainProject />} />
            <Route
              path='project/create'
              element={
                <FormProvider>
                  <CreateOrEditProject />
                </FormProvider>
              }
            >
              <Route path='general' element={<General />} />
              <Route path='team' element={<Team />} />
              <Route path='task' element={<Task />} />
              <Route path='notification' element={<Notification />} />
              <Route path='completed' element={<Completed />} />
            </Route>
            <Route
              path='project/edit/:id'
              element={
                <FormProvider>
                  <CreateOrEditProject />
                </FormProvider>
              }
            >
              <Route path='general' element={<General />} />
              <Route path='team' element={<Team />} />
              <Route path='task' element={<Task />} />
              <Route path='notification' element={<Notification />} />
              <Route path='completed' element={<Completed />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
