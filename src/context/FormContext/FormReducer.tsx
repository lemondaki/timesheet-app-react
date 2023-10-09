import { EActionEnum } from '../../enum/action.enum';
import { IActionForm, IFormInitState } from './Form.interface';
export const formReducer = (state: IFormInitState, action: IActionForm): IFormInitState => {
  switch (action.type) {
    case EActionEnum.SET_FORM_GENERAL:
      return { ...state, formGeneral: action.payload };
    case EActionEnum.SET_FORM_NOTIFICATION:
      return { ...state, notification: action.payload };
    case EActionEnum.NEXT_STEP_FORM:
      return { ...state, currentStep: Number(state.currentStep) + 1 };
    case EActionEnum.PREV_STEP_FORM:
      return { ...state, currentStep: Number(state.currentStep) - 1 };
    case EActionEnum.SELECT_USER_MEMBER:
      return {
        ...state,
        users: [...state.users, action.payload],
        selectUserArray: state.selectUserArray.filter((user) => user.id !== action.payload.id)
      };
    case EActionEnum.REMOVE_USER_MEMBER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
        selectUserArray: [action.payload, ...state.selectUserArray]
      };
    case EActionEnum.SET_SELECT_ARRAY_USER:
      return { ...state, selectUserArray: action.payload, allUsers: action.payload };
    case EActionEnum.SET_POSITION_USER:
      return { ...state, users: action.payload };
    case EActionEnum.SET_DATA_TASK:
      return {
        ...state,
        selectTaskArray: action.payload.otherTask,
        tasks: action.payload.commonTask,
        allTasks: action.payload.allTask
      };
    case EActionEnum.REMOVE_TASK:
      return {
        ...state,
        selectTaskArray: [action.payload, ...state.selectTaskArray],
        tasks: state.tasks.filter((task) => task.id !== action.payload.id)
      };
    case EActionEnum.ADD_TASK:
      return {
        ...state,
        selectTaskArray: state.selectTaskArray.filter((task) => task.id !== action.payload.id),
        tasks: [{ ...action.payload, billable: true }, ...state.tasks]
      };
    case EActionEnum.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? { ...task, billable: !task.billable } : task))
      };
    case EActionEnum.PATCH_TEAM_DATA:
      return { ...state, ...action.payload };
    case EActionEnum.PATCH_TASK_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
