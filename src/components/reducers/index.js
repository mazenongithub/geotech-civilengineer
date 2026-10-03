import { combineReducers } from 'redux';
import { MYUSER, PROJECTS, GFK } from '../actions/types';

const myuser = (state = {}, action) => {
    switch (action.type) {
        case MYUSER:
            return action.payload;

        default:
            return state;
    }
};

const projects = (state = [], action) => {
    switch (action.type) {
        case PROJECTS:
            return action.payload;

        default:
            return state;
    }
};


const gfk = (state = [], action) => {
    switch (action.type) {
        case GFK:
            return action.payload;

        default:
            return state;
    }
};


export default combineReducers({
    myuser,
    projects,
    gfk
});