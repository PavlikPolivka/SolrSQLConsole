import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {
  executeQuery() {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.QUERY_EXECUTED
    });
  }
};
