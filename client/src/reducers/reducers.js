import { combineReducers } from 'redux';

import {
  SET_FILTER, SET_USER, SET_UPDATEDATA, SET_MOVIES, SET_SHOWMODAL
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function updateData(state = null, action) {
  switch (action.type) {
    case SET_UPDATEDATA:
      return action.value;
    default:
      return state;
  }
}

function modalData(state = null, action) {
  console.log('dave', state, action)
  switch (action.type) {
    case SET_SHOWMODAL:
      return action.value
    default:
      return state;
  }
}


function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  user,
  visibilityFilter,
  movies,
  updateData,
  modalData
});

export default moviesApp;