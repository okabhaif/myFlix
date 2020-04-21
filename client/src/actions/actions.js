export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_UPDATEDATA = 'SET_UPDATEDATA';
export const SET_SHOWMODAL = 'SET_SHOWMODAL';


export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUpdateData(value) {
  return { type: SET_UPDATEDATA, value };
}

export function setShowModal(value) {
  return { type: SET_SHOWMODAL, value };
}