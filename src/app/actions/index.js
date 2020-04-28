import { createAction } from 'redux-actions';

export const addTask = createAction('ADD_TASK');
export const removeTask = createAction('REMOVE_TASK');
export const updateStateTask = createAction('UPDATE_STATE_TASK');
export const updateFilterName = createAction('FILTER_NAME');

export const inverseTaskTheme = createAction('UPDATE_UI_STATE');
