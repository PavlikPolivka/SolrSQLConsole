import React from 'react';
import Inspector  from 'react-json-inspector';
import ResultsStore from '../stores/ResultsStore';
import Loading from './Loading.jsx';



function stateChange() {
  return {
    results: ResultsStore.getResult(),
    error: ResultsStore.getError(),
    loading: ResultsStore.isLoading()
  };
}

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

  expandResults(keypath, value) {
    if(keypath === "result-set") return true;
    if(keypath === "result-set.docs") return true;
    return false;
  },

  render() {
    let json = this.state.results;
    let errorMessage = this.state.error;
    if(this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <div id="error">{errorMessage}</div>
        Results:
        <Inspector
          data={json}
          isExpanded={this.expandResults}
        />
      </div>
    );
  }
});
