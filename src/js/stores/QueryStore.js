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
const QueryStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getQuery() {
    return getFromLocalStorage("editorQuery", "select id from gettingstarted")
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;

    switch (action.type) {
    case Constants.ActionTypes.QUERY_CHANGED:
      const query = action.query.trim();
      if (query !== '') {
        setToLocalStorage("editorQuery",query);
        QueryStore.emitChange();
      }
      break;

    // add more cases for other actionTypes...

    // no default
    }
  })
});

export default QueryStore;
