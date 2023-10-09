import { EProjectTypeShortName } from '../enum/project.enum';

export const formatProjectType = (type: number): string => {
  switch (type) {
    case 0:
      return EProjectTypeShortName.TM;
    case 1:
      return EProjectTypeShortName.FIXEDPRICE;
    case 2:
      return EProjectTypeShortName.NONBILLABLE;
    case 3:
      return EProjectTypeShortName.ODC;
    case 4:
      return EProjectTypeShortName.PRODUCT;
    case 5:
      return EProjectTypeShortName.TRAINING;
    default:
      return EProjectTypeShortName.NOSALLARY;
  }
};

export const formatLevelType = (type: number): string => {
  switch (type) {
    case 0:
      return 'Internship';
    case 1:
      return 'Collaborator';
    case 2:
      return 'Internship';
    default:
      return 'Staff';
  }
};

export const formatColorLevel = (type: number): string => {
  switch (type) {
    case 0:
      return '#4caf50';
    case 1:
      return '#2e95ea';
    case 2:
      return '#f44336';
    default:
      return '#f44336';
  }
};

export const formatStepForm = (): number => {
  const currentPath = window.location.pathname;
  if (currentPath.includes('team')) {
    return 1;
  }
  if (currentPath.includes('task')) {
    return 2;
  }
  if (currentPath.includes('notification')) {
    return 3;
  }
  if (currentPath.includes('completed')) {
    return 4;
  }
  return 0;
};
