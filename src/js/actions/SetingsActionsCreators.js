import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {
  changeSettings(server, collection) {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.SETTINGS_CHANGED,
      server,
      collection
    });
  }
};
