import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {render} from 'react-dom';

injectTapEventPlugin();

render(<AppContainer />, document.getElementById('main'));
