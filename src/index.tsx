import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import ProjectProvider from './context/ProjectContext/ProjectProvider';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ProjectProvider>
      <>
        <App />
        <ToastContainer autoClose={1500} theme='light' />
      </>
    </ProjectProvider>
  </React.StrictMode>
);
reportWebVitals();
