import React from 'react';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from '../../../../../context/FormContext/FormProvider';
import { createOrEditProject } from '../../../service/project.api';
import { toast } from 'react-toastify';
import { useNavigateRoute } from '../../../../../helper/navigateRoute';
import { prevStepForm } from '../../../../../context/FormContext/FormAction';
import { useAppContext } from '../../../../../context/ProjectContext/ProjectProvider';
import { setLoading } from '../../../../../context/ProjectContext/ProjectAction';

const Completed = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const { formatDataCreateOrEditproject, dispatchForm } = useFormContext();
  const prevRoute = useNavigateRoute('notification');

  function handlePrevStep(): void {
    dispatchForm(prevStepForm());
    navigate(prevRoute);
  }

  function handleSaveFormData(): void {
    const projectData = formatDataCreateOrEditproject(id);
    dispatch(setLoading(true));
    createOrEditProject(projectData)
      .then(() => {
        if (id) {
          toast.success('Edit Project successfully!');
        } else toast.success('Create Project successfully!');
        navigate('/project');
        dispatch(setLoading(false));
      })
      .catch(() => {
        if (id) {
          toast.error('Edit Project failure!');
        } else toast.error('Create Project failure!');
        navigate('/project');
        dispatch(setLoading(false));
      });
  }

  return (
    <>
      <div className='main-content-form'>Save all your project information</div>
      <div className='wrapper-button-footer-form'>
        <Button onClick={handlePrevStep}>Back</Button>
        <Button onClick={handleSaveFormData} type='primary' htmlType='submit'>
          Save
        </Button>
      </div>
    </>
  );
};

export default Completed;
