import sessionReducer from 'store/slices/session.slice';
import dataCenterReducer from '../scenes/DataCenter/DataCenter.reducer';
import exportReducer from '../scenes/Export/Export.reducer';
import configurationReducer from '../scenes/Configuration/Configuration.reducer';
import importReducer from '../scenes/Import/Import.reducer';
import logReducer from '../scenes/Log/Log.reducer';

const rootReducer = {
  session: sessionReducer,
  dataCenter: dataCenterReducer,
  export: exportReducer,
  configuration: configurationReducer,
  import: importReducer,
  log: logReducer,
};

export default rootReducer;
