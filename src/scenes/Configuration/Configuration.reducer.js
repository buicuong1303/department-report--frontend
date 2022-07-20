import { combineReducers } from '@reduxjs/toolkit';
import agentsReducer from './scenes/Agents/Agents.reducer';
import departmentsReducer from './scenes/Departments/Departments.reducer';
import emailTeamsReducer from './scenes/EmailTeams/EmailTeams.reducer';
import logicsReducer from './scenes/Logics/Logics.reducer';


const configurationReducer = {
  agents: agentsReducer,
  departments: departmentsReducer,
  emailTeams: emailTeamsReducer,
  logics: logicsReducer,
};


export default combineReducers(configurationReducer);
