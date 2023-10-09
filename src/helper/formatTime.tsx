import {
  startOfWeek,
  format,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear
} from 'date-fns';
import { IGetProjectDto } from '../features/Project/interface/project.interface';
import { IProjectDataFormat } from '../context/ProjectContext/Project.interface';

export const formatDateTime = (date: string): string => {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
};

export const formatProjectData = (projects: IGetProjectDto[]): IProjectDataFormat => {
  const allClients = Array.from(new Set(projects.map((project) => project.customerName)));
  const allProjectsByClient = allClients.map((client) => projects.filter((project) => project.customerName === client));
  return { allClients, allProjectsByClient };
};

export const getTimeOfWeek = (currentDate: Date): { startTime: string; endTime: string } => {
  const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDayOfWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  const formattedStartDate = format(firstDayOfWeek, 'yyyy/MM/dd');
  const formattedEndDate = format(endDayOfWeek, 'yyyy/MM/dd');
  return {
    startTime: formattedStartDate,
    endTime: formattedEndDate
  };
};

export const formatWeek = (currentDate: Date): string => {
  const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDayOfWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  if (firstDayOfWeek.getMonth() === endDayOfWeek.getMonth()) {
    return `${format(firstDayOfWeek, 'dd')} - ${format(endDayOfWeek, 'dd MMM yyyy')}`;
  } else {
    return `${format(firstDayOfWeek, 'dd MMM')} - ${format(endDayOfWeek, 'dd MMM yyyy')}`;
  }
};

export const getTimeOfMonth = (currentDate: Date): { startTime: string; endTime: string } => {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const formattedStartDate = format(firstDayOfMonth, 'yyyy/MM/dd');
  const formattedEndDate = format(lastDayOfMonth, 'yyyy/MM/dd');
  return {
    startTime: formattedStartDate,
    endTime: formattedEndDate
  };
};

export const formatMonth = (currentDate: Date): string => {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const formattedStartDate = format(firstDayOfMonth, 'dd');
  const formattedEndDate = format(lastDayOfMonth, 'dd MMM yyyy');
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
  return formattedDateRange;
};

export const getTimeOfQuater = (currentDate: Date): { startTime: string; endTime: string } => {
  const startOfCurrentQuarter = startOfQuarter(currentDate);
  const endOfCurrentQuarter = endOfQuarter(currentDate);
  const formattedStartDate = format(startOfCurrentQuarter, 'yyyy/MM/dd');
  const formattedEndDate = format(endOfCurrentQuarter, 'yyyy/MM/dd');
  return {
    startTime: formattedStartDate,
    endTime: formattedEndDate
  };
};

export const formatQuarter = (currentDate: Date): string => {
  const startOfCurrentQuarter = startOfQuarter(currentDate);
  const endOfCurrentQuarter = endOfQuarter(currentDate);
  const formattedStartDate = format(startOfCurrentQuarter, 'dd MMM');
  const formattedEndDate = format(endOfCurrentQuarter, 'dd MMM yyyy');
  const formattedQuarter = `${formattedStartDate} - ${formattedEndDate}`;
  return formattedQuarter;
};

export const getTimeOfYear = (currentDate: Date): { startTime: string; endTime: string } => {
  const startOfCurrentYear = startOfYear(currentDate);
  const endOfCurrentYear = endOfYear(currentDate);
  const formattedStartDate = format(startOfCurrentYear, 'yyyy/MM/dd');
  const formattedEndDate = format(endOfCurrentYear, 'yyyy/MM/dd');
  return {
    startTime: formattedStartDate,
    endTime: formattedEndDate
  };
};

export const formatYear = (currentDate: Date): string => {
  const startOfCurrentYear = startOfYear(currentDate);
  const endOfCurrentYear = endOfYear(currentDate);
  const formattedStartDate = format(startOfCurrentYear, 'dd MMM');
  const formattedEndDate = format(endOfCurrentYear, 'dd MMM yyyy');
  const formattedYear = `${formattedStartDate} - ${formattedEndDate}`;
  return formattedYear;
};
