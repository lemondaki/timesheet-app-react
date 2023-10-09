import instanceAxios from '../../../environment/api.config';
import {
  IGetProjectDto,
  IGetUserDto,
  IProjectDto,
  IQuantityProject,
  ISelectCustomerDto,
  ITaskDto,
  ITimeStatisticMemberDto,
  ITimeStatisticTaskDto
} from '../interface/project.interface';
import { BaseUrlProject } from '../../../environment/baseUrl';
import { EFilterStatusNumber } from '../../../enum/project.enum';
import { IResponseBody } from '../../../interface/response.interface';
import { UserLoginInfoDto } from '../../Auth/interface/login.interface';
export const GetAllProject = async (status: number, search: string): Promise<IGetProjectDto[]> => {
  return (
    await instanceAxios.get(
      BaseUrlProject.URL_GETALL_PROJECT + `?status=${status === EFilterStatusNumber.ALL ? '' : status}&search=${search}`
    )
  ).data.result;
};

export const GetAllQuantityProject = async (): Promise<IQuantityProject[]> => {
  return (await instanceAxios.get(BaseUrlProject.URL_GET_QUANTITY)).data.result;
};

export const DeleteProject = async (id: number): Promise<IResponseBody<null>> => {
  return (await instanceAxios.delete(`${BaseUrlProject.URL_DELETE_PROJECT}${id}`)).data;
};

export const ActiveProject = async (id: number): Promise<IResponseBody<null>> => {
  return (await instanceAxios.post(`${BaseUrlProject.URL_ACTIVE_PROJECT}`, { id })).data;
};

export const DeActiveProject = async (id: number): Promise<IResponseBody<null>> => {
  return (await instanceAxios.post(`${BaseUrlProject.URL_INACTIVE_PROJECT}`, { id })).data;
};

export const getCurrentLoginInformation = async (): Promise<UserLoginInfoDto> => {
  return (await instanceAxios.get(`${BaseUrlProject.URL_CURRENT_INFOR_LOGIN}`)).data.result.user;
};

export const getAllCustomer = async (): Promise<ISelectCustomerDto[]> => {
  return (await instanceAxios.get(`${BaseUrlProject.URL_GETALL_CUSTOMER}`)).data.result;
};

export const getUserNotPagging = async (): Promise<IGetUserDto[]> => {
  return (await instanceAxios.get(`${BaseUrlProject.URL_GETUSER_NOTPAGGING}`)).data.result;
};

export const getAllTask = async (): Promise<ITaskDto[]> => {
  return (await instanceAxios.get(`${BaseUrlProject.URL_GETALL_TASKS}`)).data.result;
};

export const createOrEditProject = async (project: IProjectDto): Promise<IProjectDto> => {
  return await instanceAxios.post(BaseUrlProject.URL_CREATE_OR_EDIT_PROJECT, project);
};

export const getProjectById = async (id: number): Promise<IProjectDto> => {
  return (
    await instanceAxios.get(`${BaseUrlProject.URL_GET_PROJECT_BY_ID}`, {
      params: {
        input: id
      }
    })
  ).data.result;
};

export const getTimesheetStatisticTasks = async (
  projectId: number,
  startDate: string,
  endDate: string
): Promise<ITimeStatisticTaskDto[]> => {
  return (
    await instanceAxios.get(
      `${BaseUrlProject.URL_GET_DATA_VIEW_TASK}?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`
    )
  ).data.result;
};

export const getTimesheetStatisticTeams = async (
  projectId: number,
  startDate: string,
  endDate: string
): Promise<ITimeStatisticMemberDto[]> => {
  return (
    await instanceAxios.get(
      `${BaseUrlProject.URL_GET_DATA_VIEW_TEAM}?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`
    )
  ).data.result;
};
