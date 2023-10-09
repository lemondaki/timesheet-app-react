import React from 'react';
import { Button } from 'antd';
import { useFormContext } from '../../../../../context/FormContext/FormProvider';
import { Link, useNavigate } from 'react-router-dom';
import { nextStepForm, prevStepForm } from '../../../../../context/FormContext/FormAction';
import TeamShow from './TeamShow/TeamShow';
import TeamSelect from './TeamSelect/TeamSelect';
import { toast } from 'react-toastify';
import { useNavigateRoute } from '../../../../../helper/navigateRoute';
const Team = (): JSX.Element => {
  const navigate = useNavigate();
  const nextRoute = useNavigateRoute('task');
  const prevRoute = useNavigateRoute('general');
  const {
    dispatchForm,
    state: { users }
  } = useFormContext();
  function handleNextStep(): void {
    const isCheckHasPM = users.findIndex((user) => user.type === 1);
    if (!users.length) {
      toast.error('Project has atleast 1 Member');
      return;
    }
    if (isCheckHasPM === -1) {
      toast.error('Project has atleast 1 PM');
      return;
    }
    dispatchForm(nextStepForm());
    navigate(nextRoute);
  }

  return (
    <>
      <div className={'main-content-form'}>
        <TeamShow></TeamShow>
        <TeamSelect></TeamSelect>
      </div>
      <div className={'wrapper-button-footer-form'}>
        <Link to={prevRoute}>
          <Button
            onClick={() => {
              dispatchForm(prevStepForm());
            }}
          >
            Back
          </Button>
        </Link>
        <Button type='primary' onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Team;
