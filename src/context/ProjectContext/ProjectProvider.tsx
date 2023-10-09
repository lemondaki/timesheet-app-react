import React, { useReducer, createContext, useContext, useEffect } from 'react';
import { appReducer as reducer } from './Project.reducer';
import { IActionProject, IStateInit } from './Project.interface';
import { GetAllProject } from '../../features/Project/service/project.api';
import { IGetProjectDto } from '../../features/Project/interface/project.interface';
import { getAllProjectsAction, setLoading } from './ProjectAction';
import { formatProjectData } from '../../helper/formatTime';
import { EFilterStatusNumber } from '../../enum/project.enum';
import { getAccessTokenLocalStorage } from '../../features/Auth/service/auth.service';
interface IAppContextType {
  state: IStateInit;
  dispatch: React.Dispatch<IActionProject>;
}

const initState: IStateInit = {
  isLoading: false,
  accessToken: getAccessTokenLocalStorage(),
  projectsData: {
    allClients: [],
    allProjectsByClient: []
  },
  searchTextProject: '',
  filterProjectNumber: EFilterStatusNumber.ACTIVE,
  isOpenModalDialog: false,
  isOpenModalView: false,
  isOpenCustomTime: false,
  titleAction: '',
  selectProjectItem: {
    customerName: '',
    name: '',
    code: '',
    status: 0,
    pms: [],
    activeMember: 0,
    projectType: 0,
    timeStart: '',
    timeEnd: '',
    id: 0
  }
};

const AppContext = createContext<IAppContextType>({
  state: initState,
  dispatch: () => {}
});

const ProjectProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { filterProjectNumber, searchTextProject } = state;
  useEffect(() => {
    dispatch(setLoading(true));
    GetAllProject(state.filterProjectNumber, state.searchTextProject)
      .then((response: IGetProjectDto[]) => {
        const projectData = formatProjectData(response);
        dispatch(getAllProjectsAction(projectData));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  }, [filterProjectNumber, searchTextProject]);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): IAppContextType => {
  return useContext(AppContext);
};

export default ProjectProvider;
