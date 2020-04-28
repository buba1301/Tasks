/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/index';


const mapStateToProps = (state) => {
  const { taskText } = state;
  return { text: taskText };
}

const actionCreators = {
  addTask: actions.addTask,
};

const NewTaskForm = (props) => {
  const { addTask, handleSubmit, reset} = props;

  const handleAddTask = (values) => {
    const task = { ...values, id: _.uniqueId(), state: 'active' };
    addTask({ task });
    reset();
  };

  return (
        <form action="" className="form-inline" onSubmit={handleSubmit(handleAddTask)}>
          <div className="form-group mx-sm-3 mb-2">
            <Field name="text" required component="input" type="text" />
          </div>
          <input type="submit" data-testid="submit" className="btn btn-primary btn-sm mb-2" value="Add" />
        </form>
  );
};

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(NewTaskForm);

export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);
