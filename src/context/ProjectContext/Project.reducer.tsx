import { IActionProject, IStateInit } from './Project.interface';
import { EActionEnum } from '../../enum/action.enum';
export const appReducer = (state: IStateInit, action: IActionProject): IStateInit => {
  switch (action.type) {
    case EActionEnum.GET_ALL_PROJECT:
      return {
        ...state,
        projectsData: action.payload
      };
    case EActionEnum.GET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case EActionEnum.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    case EActionEnum.GET_SEARCH_TEXT:
      return {
        ...state,
        searchTextProject: action.payload
      };
    case EActionEnum.GET_FILTER_STATUS:
      return {
        ...state,
        filterProjectNumber: action.payload
      };
    case EActionEnum.SET_OPEN_MODAL_DIALOG:
      return {
        ...state,
        isOpenModalDialog: action.payload
      };
    case EActionEnum.SET_OPEN_MODAL_VIEW:
      return {
        ...state,
        isOpenModalView: action.payload
      };
    case EActionEnum.SET_OPEN_CUSTOM_TIME:
      return {
        ...state,
        isOpenCustomTime: action.payload
      };
    case EActionEnum.SET_TITLE_ACTION_MODAL:
      return {
        ...state,
        titleAction: action.payload
      };
    case EActionEnum.GET_SELECT_PROJECT_ITEM:
      return {
        ...state,
        selectProjectItem: action.payload
      };
    default:
      return state;
  }
};
