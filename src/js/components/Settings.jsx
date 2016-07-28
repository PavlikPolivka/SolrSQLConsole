import React from 'react';
import SettingsStore from '../stores/SettingsStore';
import SettingActionsCreators from '../actions/SetingsActionsCreators';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

function stateChange(open) {
  return {
    server: SettingsStore.getServerUrl(),
    collection: SettingsStore.getCollection(),
    open: open
  };
}

export default React.createClass({
  getInitialState() {
    return stateChange(false);
  },

  _onChange() {
    this.setState(stateChange(this.state.open));
  },

  componentDidMount() {
    SettingsStore.addChangeListener(this._onChange);
  },

  handleOpen() {
    this.setState(stateChange(true));
  },

  handleClose() {
    this.setState(stateChange(false));
  },

  handleServerChange(event) {
    SettingActionsCreators.changeSettings(event.target.value, this.state.collection);
  },

  handleCollectionChange(event) {
    SettingActionsCreators.changeSettings(this.state.server, event.target.value);
  },

  render() {
    let server = this.state.server;
    let collection = this.state.collection;
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="SOLR SQL Console"/>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label={server + '/solr/' + collection + '/sql'} onTouchTap={this.handleOpen} />

          <Dialog
            title="Solr server settings"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div>
              <TextField
                hintText="Solr Server"
                floatingLabelText="Solr Server"
                id="server-solr"
                value={this.state.server}
                onChange={this.handleServerChange}
              /><br />
              <br />
              <TextField
                hintText="Solr Collection"
                floatingLabelText="Solr Collection"
                id="collection-solr"
                value={this.state.collection}
                onChange={this.handleCollectionChange}
              /><br />
            </div>
          </Dialog>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});
