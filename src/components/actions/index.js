import { MYUSER, PROJECTS, GFK } from './types';

export const reduxUser = (myuser) => async dispatch => {

    dispatch({ type: MYUSER, payload: myuser })
}

export const reduxProjects = (projects) => async dispatch => {

    dispatch({ type: PROJECTS, payload: projects})
}

export const reduxGFK = (gfk) => async dispatch => {

    dispatch({ type: GFK, payload: gfk})
}