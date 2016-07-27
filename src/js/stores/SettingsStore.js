import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

var _data = {};

// add private functions to modify data
function setToLocalStorage(key, value) {
  _data[key] = value;
}

function getFromLocalStorage(key, defaultValue) {
  let storageValue = _data[key];
  if(!storageValue) {
    return defaultValue;
  }
  return storageValue;
}

// Facebook style store creation.
const SettingsStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getServerUrl() {
    return getFromLocalStorage("serverUrl", "http://localhost:8983");
  },
  getCollection() {
    return getFromLocalStorage("collectionName", "gettingstarted");
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;

    switch (action.type) {
    case Constants.ActionTypes.SETTINGS_CHANGED:
      setToLocalStorage("serverUrl", action.server);
      setToLocalStorage("collectionName", action.collection);
      SettingsStore.emitChange();
      break;

    // add more cases for other actionTypes...

    // no default
    }
  })
});

export default SettingsStore;
