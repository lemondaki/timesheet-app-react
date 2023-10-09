export interface IGetProjectDto {
  customerName: string;
  name: string;
  code: string;
  status: number;
  pms: [];
  activeMember: number;
  projectType: number;
  timeStart: string;
  timeEnd: string;
  id: number;
}

export interface IQuantityProject {
  status: number;
  quantity: number;
}

export interface IFormGeneral {
  customerId: number;
  name: string;
  code: string;
  timeStart: string;
  timeEnd: string;
  note: string;
  status: boolean;
  projectType: number;
}

export interface IFormTeam {
  users: IGetUserDto[];
  selectUserArray: IGetUserDto[];
}

export interface IFormTask {
  tasks: ITaskDto[];
  selectTaskArray: ITaskDto[];
}

export interface ISelectCustomerDto {
  name: string;
  code: string;
  id: number;
}

export interface IProjectType {
  projectTypeId: number;
  typeName: string;
}

export interface IPositionType {
  projectId: number;
  positionId: number;
}

export interface IGetUserDto {
  name: string;
  emailAddress: string;
  isActive: boolean;
  type: number;
  jobTitle: string;
  level: number;
  userCode: string;
  avatarPath: string;
  avatarFullPath: string;
  branch: number;
  branchColor: string;
  branchDisplayName: string;
  branchId: number;
  positionId: number;
  positionName: string;
  isTemp?: boolean;
  id: number;
}

export interface ITaskDto {
  name: string;
  type: number;
  isDeleted: boolean;
  id: number;
  billable?: boolean;
}

export interface IDataTask {
  commonTask: ITaskDto[];
  otherTask: ITaskDto[];
  allTask: ITaskDto[];
}

export interface IProjectTaskDto {
  taskId: number;
  billable: boolean;
  id?: number;
}

export interface IProjectUserDto {
  userId: number;
  type: number;
  isTemp: boolean;
  id?: number;
}

export interface IProjectTargetUserDto {
  userId: number;
  roleName: string;
  id: number;
}

export interface IProjectDto {
  name: string;
  code: string;
  status: number;
  timeStart: string;
  timeEnd: string;
  note: string;
  projectType: number;
  customerId: number;
  tasks: IProjectTaskDto[];
  users: IProjectUserDto[];
  projectTargetUsers: IProjectTargetUserDto[];
  komuChannelId: string;
  isNotifyToKomu: boolean;
  isNoticeKMSubmitTS: boolean;
  isNoticeKMRequestOffDate: boolean;
  isNoticeKMApproveRequestOffDate: boolean;
  isNoticeKMRequestChangeWorkingTime: boolean;
  isNoticeKMApproveChangeWorkingTime: boolean;
  isAllUserBelongTo: boolean;
  id?: number;
}

export interface ITimeStatisticTaskDto {
  taskId: number;
  taskName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
  billable: boolean;
}

export interface ITimeStatisticMemberDto {
  userID: number;
  userName: string;
  projectUserType: number;
  totalWorkingTime: number;
  billableWorkingTime: number;
}

export interface ICustomTimeState {
  timeTitle: string;
  timeValue: {
    startTime: string;
    endTime: string;
  };
}
