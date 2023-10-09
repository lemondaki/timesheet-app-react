import { EActionEnum } from '../../enum/action.enum';
import {
  IDataTask,
  IFormGeneral,
  IFormTask,
  IFormTeam,
  IGetUserDto,
  IProjectDto,
  ITaskDto
} from '../../features/Project/interface/project.interface';

export interface IFormInitState {
  formGeneral: IFormGeneral;
  users: IGetUserDto[];
  tasks: ITaskDto[];
  allUsers: IGetUserDto[];
  allTasks: ITaskDto[];
  selectUserArray: IGetUserDto[];
  selectTaskArray: ITaskDto[];
  currentStep: number;
  notification: INotification;
}

export interface INotification {
  komuChannelId: string;
  isNoticeKMSubmitTS: boolean;
  isNoticeKMRequestOffDate: boolean;
  isNoticeKMApproveRequestOffDate: boolean;
  isNoticeKMRequestChangeWorkingTime: boolean;
  isNoticeKMApproveChangeWorkingTime: boolean;
}

export interface ISetFormGeneral {
  type: EActionEnum.SET_FORM_GENERAL;
  payload: IFormGeneral;
}

export interface ISetFormNotification {
  type: EActionEnum.SET_FORM_NOTIFICATION;
  payload: INotification;
}

export interface IPatchTeamData {
  type: EActionEnum.PATCH_TEAM_DATA;
  payload: IFormTeam;
}

export interface IPatchTaskData {
  type: EActionEnum.PATCH_TASK_DATA;
  payload: IFormTask;
}

export interface IPatchDataForm {
  type: EActionEnum.PATCH_DATA_FORM;
  payload: IProjectDto;
}

export interface INextStepForm {
  type: EActionEnum.NEXT_STEP_FORM;
}

export interface IPrevStepForm {
  type: EActionEnum.PREV_STEP_FORM;
}

export interface ISelectUserMember {
  type: EActionEnum.SELECT_USER_MEMBER;
  payload: IGetUserDto;
}

export interface ISetPositionUser {
  type: EActionEnum.SET_POSITION_USER;
  payload: IGetUserDto[];
}

export interface IRemoveUserMember {
  type: EActionEnum.REMOVE_USER_MEMBER;
  payload: IGetUserDto;
}

export interface ISelectArrayUser {
  type: EActionEnum.SET_SELECT_ARRAY_USER;
  payload: IGetUserDto[];
}

export interface ISetDataTask {
  type: EActionEnum.SET_DATA_TASK;
  payload: IDataTask;
}

export interface IRemoveTask {
  type: EActionEnum.REMOVE_TASK;
  payload: ITaskDto;
}

export interface IAddTask {
  type: EActionEnum.ADD_TASK;
  payload: ITaskDto;
}

export interface IUpdateTask {
  type: EActionEnum.UPDATE_TASK;
  payload: ITaskDto;
}

export type IActionForm =
  | ISetFormGeneral
  | INextStepForm
  | IPrevStepForm
  | ISelectUserMember
  | IRemoveUserMember
  | ISelectArrayUser
  | ISetDataTask
  | IRemoveTask
  | IAddTask
  | ISetFormNotification
  | IPatchDataForm
  | IPatchTeamData
  | IPatchTaskData
  | ISetPositionUser
  | IUpdateTask;
