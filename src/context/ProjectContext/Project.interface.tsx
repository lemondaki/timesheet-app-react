import { EActionEnum } from '../../enum/action.enum';
import { IGetProjectDto } from '../../features/Project/interface/project.interface';

export interface IProjectDataFormat {
  allClients: string[];
  allProjectsByClient: IGetProjectDto[][];
}

export interface IStateInit {
  isLoading: boolean;
  accessToken: string | null;
  projectsData: IProjectDataFormat;
  searchTextProject: string;
  filterProjectNumber: number;
  isOpenModalDialog: boolean;
  isOpenModalView: boolean;
  isOpenCustomTime: boolean;
  titleAction: string;
  selectProjectItem: IGetProjectDto;
}

export interface IGetAccessToken {
  type: EActionEnum.SET_ACCESS_TOKEN;
  payload: string | null;
}

export interface ISetLoading {
  type: EActionEnum.GET_IS_LOADING;
  payload: boolean;
}

export interface IGetAllProject {
  type: EActionEnum.GET_ALL_PROJECT;
  payload: IProjectDataFormat;
}

export interface IGetSearchText {
  type: EActionEnum.GET_SEARCH_TEXT;
  payload: string;
}

export interface IGetFilterStatus {
  type: EActionEnum.GET_FILTER_STATUS;
  payload: number;
}

export interface IOpenModalDialog {
  type: EActionEnum.SET_OPEN_MODAL_DIALOG;
  payload: boolean;
}

export interface IOpenModalView {
  type: EActionEnum.SET_OPEN_MODAL_VIEW;
  payload: boolean;
}

export interface IOpenCustomTime {
  type: EActionEnum.SET_OPEN_CUSTOM_TIME;
  payload: boolean;
}

export interface ISetTitleActionModal {
  type: EActionEnum.SET_TITLE_ACTION_MODAL;
  payload: string;
}

export interface ISelectProjectItem {
  type: EActionEnum.GET_SELECT_PROJECT_ITEM;
  payload: IGetProjectDto;
}

export type IActionProject =
  | IGetAllProject
  | IGetSearchText
  | IGetFilterStatus
  | IOpenModalDialog
  | ISetTitleActionModal
  | ISelectProjectItem
  | IOpenModalView
  | IOpenCustomTime
  | IGetAccessToken
  | ISetLoading;
