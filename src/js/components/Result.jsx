import React from 'react';
import Inspector  from 'react-json-inspector';
import ResultsStore from '../stores/ResultsStore';
import CircularProgress from 'material-ui/CircularProgress';
import JSONTree from 'react-json-tree'



function stateChange() {
  return {
    results: ResultsStore.getResult(),
    error: ResultsStore.getError(),
    loading: ResultsStore.isLoading()
  };
}

const theme = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED'
};

export default React.createClass({
  getInitialState() {
    return stateChange();
  },

  _onChange() {
    this.setState(stateChange());
  },

  componentDidMount() {
    ResultsStore.addChangeListener(this._onChange);
  },

  expandResults(keypath) {
    if(keypath[0] === "root") return true;
    if(keypath[0] === "result-set") return true;
    if(keypath[0] === "docs") return true;
    return true;
  },

  render() {
    let json = this.state.results;
    let errorMessage = this.state.error;
    if(this.state.loading) {
      return (<div id="loading"><CircularProgress /></div>);
    }
    if(errorMessage) {
      return (<div id="error">{errorMessage}</div>);
    }
    if(!(Object.keys(json).length === 0 && json.constructor === Object)) {
      return (
        <div>
          <JSONTree data={json} shouldExpandNode={this.expandResults} theme={theme} isLightTheme={true} />
        </div>
      );
    }
    return (<div id="info">No Results</div>);
  }
});
