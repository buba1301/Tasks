/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

const filters = [['all', 'All Tasks'], ['active', 'Active Tasks'], ['finished', 'Finished Tasks']];

const mapStateToProps = (state) => {
  const { tasks: { currentFilterName } } = state;
  return { currentFilterName };
};

const actionCreators = {
  updateFilterName: actions.updateFilterName,
};

const Filter = (props) => {
  const { currentFilterName, updateFilterName } = props;

  const handleFilterTasks = (filterName) => () => {
    updateFilterName({ filterName });
  };

  const renderFilterButtons = ([filterName, text]) => {
    if (filterName === currentFilterName) {
      return text;
    }
    return (
        <button 
          type="button"
          key={filterName}
          className="btn btn-link border-0 p-0" 
          onClick={handleFilterTasks(filterName)} 
          data-test="task-filter-active"
        >
            {text}
        </button>
    );
  };

  return (
    <div className="mt-3 d-flex justify-content-around">
      {filters.map(renderFilterButtons)}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Filter);
