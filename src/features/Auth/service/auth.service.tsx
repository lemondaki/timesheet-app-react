import { IAuthenticateModel, IResponseLogin } from '../interface/login.interface';
import { IResponseBody } from '../../../interface/response.interface';
import instanceAxios from '../../../environment/api.config';
export const login = async (account: IAuthenticateModel): Promise<IResponseBody<IResponseLogin>> => {
  return (await instanceAxios.post('TokenAuth/Authenticate', account)).data;
};

export const setAccessTokenLocalStorage = (accessToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessTokenLocalStorage = (): string | null => {
  return localStorage.getItem('accessToken');
};
