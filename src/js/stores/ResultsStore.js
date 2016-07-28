import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import SettingsStore from './SettingsStore';
import QueryStore from './QueryStore';
import assign from 'object-assign';

// data storage
let _result = {};
let _loading = false;
let _error = "";

// add private functions to modify data
function saveResult(result) {
  _result = result;
}

// Facebook style store creation.
const ResultsStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getResult() {
    return _result;
  },
  isLoading() {
    return _loading;
  },
  getError() {
    return _error;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;

    if (action.type === Constants.ActionTypes.QUERY_EXECUTED) {
      Dispatcher.waitFor([SettingsStore.dispatcherIndex, QueryStore.dispatcherIndex]);
      let url = SettingsStore.getServerUrl() + '/solr/' + SettingsStore.getCollection() + '/sql?stmt=' + encodeURIComponent(QueryStore.getQuery());
      _loading = true;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          _loading = false;
        }

        if (xhr.readyState == 4 && xhr.status == 200) {
          _result = JSON.parse(xhr.responseText);
          _error = "";
        }
        else if (xhr.readyState == 4 && xhr.status == 0) {
          _error = "Solr server not accessible.";
        }
        else {
          _error = xhr.statusText;
        }
        ResultsStore.emitChange();
      };
      xhr.open("GET", url, true);
      xhr.send();
      ResultsStore.emitChange();
    }
  })
});

export default ResultsStore;
