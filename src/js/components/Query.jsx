import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/sql';
import 'brace/theme/github';
import QueryActionsCreators from '../actions/QueryActionsCreators';
import ResultActionCreators from '../actions/ResultActionsCreators';
import QueryStore from '../stores/QueryStore';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';

function stateChange() {
  return {
    query: QueryStore.getQuery()
  };
}

const style = {
  position: 'absolute',
  top: '90vh',
  left: '28vw',
  zIndex: '20',
};

export default React.createClass({
  getInitialState() {
    return stateChange();
  },

  _onChange() {
    this.setState(stateChange());
  },

  componentDidMount() {
    QueryStore.addChangeListener(this._onChange);
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
          width="33vw"
          heigth="100vh"
        />
        <FloatingActionButton style={style} onClick={this.executeQuery}>
          <PlayArrow />
        </FloatingActionButton>
      </div>
    );
  }
});
