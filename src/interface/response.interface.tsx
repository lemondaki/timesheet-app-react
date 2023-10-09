export interface IResponseBody<T> {
  result: T;
  targetUrl: null;
  success: boolean;
  error: null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
