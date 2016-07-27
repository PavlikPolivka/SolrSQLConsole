import React from 'react';
import SettingsStore from '../stores/SettingsStore';
import SettingActionsCreators from '../actions/SetingsActionsCreators';

function stateChange() {
  return {
    server: SettingsStore.getServerUrl(),
    collection: SettingsStore.getCollection()
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
    SettingsStore.addChangeListener(this._onChange);
  },

  changeSettingsClick() {
    let server = this.refs.serverUrl.getDOMNode().value;
    let collection = this.refs.collectionName.getDOMNode().value;
    SettingActionsCreators.changeSettings(server, collection);
  },

  render() {
    let server = this.state.server;
    let collection = this.state.collection;
    return (
      <div>
        <div>
          <label>
            Solr Server Url:
            <input ref="serverUrl" defaultValue={server} />
          </label>
          <label>
            Solr Collection:
            <input ref="collectionName" defaultValue={collection} />
          </label>
          <button onClick={this.changeSettingsClick}>Change</button>
        </div>
        <div>
          {server + '/solr/' + collection + '/sql'}
        </div>
      </div>
    );
  }
});
