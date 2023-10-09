import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { formReducer } from './FormReducer';
import { IActionForm, IFormInitState } from './Form.interface';
import { getAllTask, getUserNotPagging } from '../../features/Project/service/project.api';
import { setDataTask, setSelectArrayUser } from './FormAction';
import { IProjectDto } from '../../features/Project/interface/project.interface';
import { formatStepForm } from '../../helper/transform';
import { toast } from 'react-toastify';

export interface IFormContextType {
  state: IFormInitState;
  dispatchForm: React.Dispatch<IActionForm>;
  formatDataCreateOrEditproject: Function;
}

const formInitState: IFormInitState = {
  formGeneral: {
    customerId: 1,
    name: '',
    code: '',
    timeStart: '',
    timeEnd: '',
    note: '',
    status: false,
    projectType: 1
  },
  users: [],
  tasks: [],
  allTasks: [],
  allUsers: [],
  selectUserArray: [],
  selectTaskArray: [],
  currentStep: formatStepForm(),
  notification: {
    komuChannelId: '',
    isNoticeKMSubmitTS: false,
    isNoticeKMRequestOffDate: false,
    isNoticeKMApproveRequestOffDate: false,
    isNoticeKMRequestChangeWorkingTime: false,
    isNoticeKMApproveChangeWorkingTime: false
  }
};

const FormContext = createContext<IFormContextType>({
  state: formInitState,
  dispatchForm: () => {},
  formatDataCreateOrEditproject: () => {}
});

export const FormProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatchForm] = useReducer(formReducer, formInitState);

  function fetchUserNotPagging(): void {
    getUserNotPagging()
      .then((data) => {
        const users = data.map((d) => ({ ...d, isTemp: false }));
        dispatchForm(setSelectArrayUser(users));
      })
      .catch(() => toast.error('There are something wrong'));
  }

  function fecthAllTasks(): void {
    getAllTask()
      .then((data) => {
        const commonTask = data.filter((data) => data.type === 0).map((task) => ({ ...task, billable: true }));
        const otherTask = data.filter((data) => data.type === 1);
        dispatchForm(setDataTask({ commonTask, otherTask, allTask: data }));
      })
      .catch(() => toast.error('There are something wrong'));
  }

  function formatDataCreateOrEditproject(id?: number): IProjectDto {
    const users = state.users.map((user) => ({
      userId: user.id,
      type: user.type,
      isTemp: user?.isTemp ?? false
    }));

    const tasks = state.tasks.map((task) => ({
      taskId: task.id,
      billable: task.billable ?? false
    }));

    return {
      ...state.formGeneral,
      users,
      tasks,
      status: state.formGeneral.status ? 1 : 0,
      ...state.notification,
      projectTargetUsers: [],
      isNotifyToKomu: true,
      isAllUserBelongTo: true,
      id
    };
  }

  useEffect(() => {
    fetchUserNotPagging();
    fecthAllTasks();
  }, []);

  return (
    <FormContext.Provider value={{ state, dispatchForm, formatDataCreateOrEditproject }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): IFormContextType => {
  return useContext(FormContext);
};
