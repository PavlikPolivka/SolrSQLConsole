import React, {PropTypes} from 'react';
import Settings from './Settings.jsx';
import SettingsActionsCreators from '../actions/SetingsActionsCreators';
import QueryActionsCreators from '../actions/QueryActionsCreators';
import Query from './Query.jsx';
import Result from './Result.jsx';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default React.createClass({

  getDefaultProps() {
    return {}
  },

  childContextTypes:{
    muiTheme: React.PropTypes.object.isRequired,
  },
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  },

  componentDidMount() {
    SettingsActionsCreators.init();
    QueryActionsCreators.initQuery();
  },

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Settings />
          <div className="">
            <div className="col-1-3">
              <Query />
            </div>
            <div className="col-2-3" id="ResultList">
              <Result />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
});
