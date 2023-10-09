import React from 'react';
import { Button } from 'antd';
import { useFormContext } from '../../../../../context/FormContext/FormProvider';
import { nextStepForm, prevStepForm } from '../../../../../context/FormContext/FormAction';
import TaskShow from './TaskShow/TaskShow';
import TaskSelect from './TaskSelect/TaskSelect';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigateRoute } from '../../../../../helper/navigateRoute';
const Task = (): JSX.Element => {
  const navigate = useNavigate();
  const nextRoute = useNavigateRoute('notification');
  const prevRoute = useNavigateRoute('team');
  const {
    state: { tasks },
    dispatchForm
  } = useFormContext();

  function handleNextStep(): void {
    if (tasks.length) {
      navigate(nextRoute);
      dispatchForm(nextStepForm());
    } else toast.error('Please choose atleast 1 task');
  }

  return (
    <div>
      <div className='main-content-form'>
        <TaskShow />
        <TaskSelect />
      </div>
      <div className='wrapper-button-footer-form'>
        <Link to={prevRoute}>
          <Button onClick={() => dispatchForm(prevStepForm())}>Back</Button>
        </Link>

        <Button type='primary' onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Task;
