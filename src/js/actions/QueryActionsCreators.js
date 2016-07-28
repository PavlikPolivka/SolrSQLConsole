import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {
  setQuery(query) {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.QUERY_CHANGED,
      query
    });
  },
  initQuery() {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.INIT_QUERY
    });
  }
};
