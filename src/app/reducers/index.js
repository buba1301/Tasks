import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions/index';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds],
    };
  },
  [actions.removeTask](state, { payload: { currentId } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: _.omit(byId, currentId),
      allIds: allIds.filter((id) => id !== currentId),
    };
  },
  [actions.updateStateTask](state, { payload: { currentId } }) {
    const { byId } = state;
    const task = byId[currentId];
    const newState = (task.state === 'active') ? 'finished' : 'active';
    const updateTask = { ...task, state: newState };
    return {
      ...state,
      byId: { ...state.byId, [currentId]: updateTask },
    };
  },
  [actions.updateFilterName](state, { payload: { filterName } }) {
    return {
      ...state,
      currentFilterName: filterName,
    };
  },
}, { byId: {}, allIds: [], currentFilterName: 'all' });

const tasksUIState = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    return { ...state, [task.id]: { theme: 'light' } };
  },
  [actions.removeTask](state, { payload: { currentId } }) {
    return _.omit(state, currentId);
  },
  [actions.inverseTaskTheme](state, { payload: { currentId } }) {
    const currentTheme = state[currentId].theme;
    const mapping = {
      light: 'dark',
      dark: 'light',
    };
    return { ...state, [currentId]: { theme: mapping[currentTheme] } };
  },
}, {});

export default combineReducers({
  form: formReducer,
  tasks,
  tasksUIState,
});
