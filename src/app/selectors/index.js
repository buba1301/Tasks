import { createSelector } from 'reselect';

const getById = (state) => state.tasks.byId;
const getAllIds = (state) => state.tasks.allIds;
const getCurrentFilterName = (state) => state.tasks.currentFilterName;

export const tasksSelector = createSelector(
  [getById, getAllIds],
  (byId, allIds) => allIds.map((id) => byId[id]),
);

export const filteredTasksSelector = createSelector(
  [tasksSelector, getCurrentFilterName],
  (tasks, filterName) => (filterName === 'all' ? tasks : tasks.filter((t) => t.state === filterName)),
);
