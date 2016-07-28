import keyMirror from 'fbjs/lib/keyMirror';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  // Each time you add an action, add it here... They should be past-tense
  ActionTypes: keyMirror({
    TASK_ADDED: null,
    SETTINGS_CHANGED: null,
    QUERY_EXECUTED: null,
    LOCAL_STORAGE_CHANGED: null,
    INIT: null,
    INIT_QUERY: null,
    QUERY_CHANGED: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
