import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../../../context/ProjectContext/ProjectProvider';
interface propsType {
  children: JSX.Element;
  redirectTo: string;
}
export function RequireAuth({ children, redirectTo }: propsType): JSX.Element {
  const {
    state: { accessToken }
  } = useAppContext();
  return accessToken !== null ? children : <Navigate to={redirectTo} />;
}
