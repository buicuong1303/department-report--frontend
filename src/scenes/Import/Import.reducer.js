import { combineReducers } from '@reduxjs/toolkit';
import panel from './scenes/ImportPanel/ImportPanel.reducer';
import tracking from './scenes/ImportTracking/ImportTracking.reducer';

export default combineReducers({
  panel,
  tracking
});
