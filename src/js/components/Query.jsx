import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/sql';
import 'brace/theme/github';
import QueryActionsCreators from '../actions/QueryActionsCreators';
import ResultActionCreators from '../actions/ResultActionsCreators';
import QueryStore from '../stores/QueryStore';

function stateChange() {
  return {
    query: QueryStore.getQuery()
  };
}

export default React.createClass({
  getInitialState() {
    return stateChange();
  },

  componentDidMount() {
  },

  editorChange(newQuery) {
    QueryActionsCreators.setQuery(newQuery);
  },

  executeQuery() {
    ResultActionCreators.executeQuery();
  },

  render() {
    let query = this.state.query;
    return (
      <div>
        <AceEditor
          mode="sql"
          theme="github"
          onChange={this.editorChange}
          name="Query_Editor"
          editorProps={{$blockScrolling: true}}
          value={query}
        />
        <button onClick={this.executeQuery}>Execute</button>
      </div>
    );
  }
});
