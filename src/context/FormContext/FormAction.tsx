import { EActionEnum } from '../../enum/action.enum';
import {
  IDataTask,
  IFormGeneral,
  IFormTask,
  IFormTeam,
  IGetUserDto,
  ITaskDto
} from '../../features/Project/interface/project.interface';
import {
  IAddTask,
  INextStepForm,
  INotification,
  IPatchTaskData,
  IPatchTeamData,
  IPrevStepForm,
  IRemoveTask,
  IRemoveUserMember,
  ISelectArrayUser,
  ISelectUserMember,
  ISetDataTask,
  ISetFormGeneral,
  ISetFormNotification,
  ISetPositionUser,
  IUpdateTask
} from './Form.interface';

export const setFormGeneral = (payload: IFormGeneral): ISetFormGeneral => {
  return { type: EActionEnum.SET_FORM_GENERAL, payload };
};

export const setFormNotification = (payload: INotification): ISetFormNotification => {
  return { type: EActionEnum.SET_FORM_NOTIFICATION, payload };
};

export const patchTeamData = (payload: IFormTeam): IPatchTeamData => {
  return { type: EActionEnum.PATCH_TEAM_DATA, payload };
};

export const patchTaskData = (payload: IFormTask): IPatchTaskData => {
  return { type: EActionEnum.PATCH_TASK_DATA, payload };
};

export const nextStepForm = (): INextStepForm => {
  return { type: EActionEnum.NEXT_STEP_FORM };
};

export const prevStepForm = (): IPrevStepForm => {
  return { type: EActionEnum.PREV_STEP_FORM };
};

export const selectUserMember = (payload: IGetUserDto): ISelectUserMember => {
  return { type: EActionEnum.SELECT_USER_MEMBER, payload };
};

export const setPositionUser = (payload: IGetUserDto[]): ISetPositionUser => {
  return { type: EActionEnum.SET_POSITION_USER, payload };
};

export const removeUserMember = (payload: IGetUserDto): IRemoveUserMember => {
  return { type: EActionEnum.REMOVE_USER_MEMBER, payload };
};

export const setSelectArrayUser = (payload: IGetUserDto[]): ISelectArrayUser => {
  return { type: EActionEnum.SET_SELECT_ARRAY_USER, payload };
};

export const setDataTask = (payload: IDataTask): ISetDataTask => {
  return { type: EActionEnum.SET_DATA_TASK, payload };
};

export const removeTask = (payload: ITaskDto): IRemoveTask => {
  return { type: EActionEnum.REMOVE_TASK, payload };
};

export const addTask = (payload: ITaskDto): IAddTask => {
  return { type: EActionEnum.ADD_TASK, payload };
};

export const updateTask = (payload: ITaskDto): IUpdateTask => {
  return { type: EActionEnum.UPDATE_TASK, payload };
};
