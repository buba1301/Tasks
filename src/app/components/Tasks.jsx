/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index';
import { filteredTasksSelector } from '../selectors/index';

const mapStateToProps = (state) => {
  const { tasksUIState } = state;
  const tasks = filteredTasksSelector(state);
  return { tasks, tasksUIState };
};

const actionCreators = {
  removeTask: actions.removeTask,
  updateStateTask: actions.updateStateTask,
  inverseTaskTheme: actions.inverseTaskTheme,
};

const Tasks = (props) => {
  const handleRemoveTask = (currentId) => () => {
    const { removeTask } = props;
    removeTask({ currentId });
  };

  const handleUpdateTaskState = (currentId) => () => {
    const { updateStateTask, inverseTaskTheme } = props;
    updateStateTask({ currentId });
    inverseTaskTheme({ currentId });
  };

  const renderTasks = ({ text, id, state }) => {
    const { tasksUIState } = props;
    console.log(id);
    const themeToClasses = {
      dark: 'bg-dark text-light',
      light: 'bg-light text-dark',
    };
    console.log(tasksUIState);
    const currentTheme = tasksUIState[id].theme;
    const currentThemeClass = themeToClasses[currentTheme];

    const classes = cn({
      'list-group-item d-flex': true,
      [currentThemeClass]: true,
    });

    return (
        <li key={id} className={classes} >
          <span className="mr-auto" >
            <a href="#" data-test="task-toggle-state" onClick={handleUpdateTaskState(id)}>
              {state === 'active' ? text : <s>{text}</s>}
            </a>
          </span>
          <button type="button" data-test="task-remove" className="close" onClick={handleRemoveTask(id)}>
            <span>&times;</span>
          </button>
        </li>
    );
  };

  const { tasks } = props;

  if (tasks.length === 0) {
    return null;
  }

  return (
        <div className="mt-3">
          <ul className="list-group">
            {tasks.map((task) => renderTasks(task))}
          </ul>
        </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Tasks);
