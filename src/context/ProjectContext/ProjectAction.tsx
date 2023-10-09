import { EActionEnum } from '../../enum/action.enum';
import { IGetProjectDto } from '../../features/Project/interface/project.interface';
import {
  IActionProject,
  IOpenCustomTime,
  IOpenModalView,
  IProjectDataFormat,
  ISelectProjectItem,
  ISetTitleActionModal
} from './Project.interface';

export const setAccessToken = (payload: string | null): IActionProject => {
  return {
    type: EActionEnum.SET_ACCESS_TOKEN,
    payload
  };
};

export const setLoading = (payload: boolean): IActionProject => {
  return {
    type: EActionEnum.GET_IS_LOADING,
    payload
  };
};

export const getAllProjectsAction = (payload: IProjectDataFormat): IActionProject => {
  return {
    type: EActionEnum.GET_ALL_PROJECT,
    payload
  };
};

export const getSearchTextAction = (payload: string): IActionProject => {
  return {
    type: EActionEnum.GET_SEARCH_TEXT,
    payload
  };
};

export const getFilterStatusAction = (payload: number): IActionProject => {
  return {
    type: EActionEnum.GET_FILTER_STATUS,
    payload
  };
};

export const setOpenModalDialog = (payload: boolean): IActionProject => {
  return {
    type: EActionEnum.SET_OPEN_MODAL_DIALOG,
    payload
  };
};

export const setOpenModalView = (payload: boolean): IOpenModalView => {
  return {
    type: EActionEnum.SET_OPEN_MODAL_VIEW,
    payload
  };
};

export const setOpenCustomTime = (payload: boolean): IOpenCustomTime => {
  return {
    type: EActionEnum.SET_OPEN_CUSTOM_TIME,
    payload
  };
};

export const setTitleActionModal = (payload: string): ISetTitleActionModal => {
  return {
    type: EActionEnum.SET_TITLE_ACTION_MODAL,
    payload
  };
};

export const getSelectProjectItem = (payload: IGetProjectDto): ISelectProjectItem => {
  return {
    type: EActionEnum.GET_SELECT_PROJECT_ITEM,
    payload
  };
};
