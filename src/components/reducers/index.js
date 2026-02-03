import { combineReducers } from 'redux';
import myuser from './myuserreducer';
import projects from './projectsreducer'

export default combineReducers({
    myuser,
    projects
})