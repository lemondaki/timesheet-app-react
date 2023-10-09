export interface IAuthenticateModel {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

export interface IResponseLogin {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  userId: number;
}

export interface UserLoginInfoDto {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  allowedLeaveDay: number;
  type: number;
  level: number;
  sex: number;
  branch: number;
  avatarPath: string;
  avatarFullPath: string;
  morningWorking: string;
  morningStartAt: string;
  morningEndAt: string;
  afternoonWorking: string;
  afternoonStartAt: string;
  afternoonEndAt: string;
  isWorkingTimeDefault: boolean;
  branchId: number;
  id: number;
}
