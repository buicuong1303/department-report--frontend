import { combineReducers } from '@reduxjs/toolkit';
import exportData from './scenes/ExportData/ExportData.reducer';
import manageWorkingTime from './scenes/ManageWorkingTime/ManageWorkingTime.reducer';

export default combineReducers({
  exportData,
  manageWorkingTime
});
