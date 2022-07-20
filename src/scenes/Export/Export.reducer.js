import { combineReducers } from '@reduxjs/toolkit';
import panel from './scenes/ExportPanel/ExportPanel.reducer';
import tracking from './scenes/ExportTracking/ExportTracking.reducer';

const exportReducer = {
  panel,
  tracking
};

export default combineReducers(exportReducer);
