import { MYUSER, PROJECTS } from './types';

export const reduxUser = (myuser) => async dispatch => {

    dispatch({ type: MYUSER, payload: myuser })
}

export const reduxProjects = (projects) => async dispatch => {

    dispatch({ type: PROJECTS, payload: projects})
}