import React, {PropTypes} from 'react';
import Settings from './Settings.jsx';
import Query from './Query.jsx';
import Result from './Result.jsx';

export default React.createClass({

  getDefaultProps() {
    return {}
  },

  render() {
    return (
      <div>
        <h1>SOLR SQL Console</h1>
        <Settings />
        <Query />
        <Result />
      </div>
    );
  }
});
