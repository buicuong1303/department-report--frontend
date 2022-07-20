import { combineReducers } from '@reduxjs/toolkit';
import emailReducer from './scenes/Email/Email.reducer';
import epicReducer from './scenes/Epic/Epic.reducer';
import glipReducer from './scenes/Glip/Glip.reducer';
import icReducer from './scenes/IC/IC.reducer';
import phoneReducer from './scenes/Phone/Phone.reducer';
import punchReducer from './scenes/Punch/Punch.reducer';
import mixinReducer from './Mixin.reducer';

const dataCenterReducer = {
  email: emailReducer,
  epic: epicReducer,
  glip: glipReducer,
  ic: icReducer,
  phone: phoneReducer,
  punch: punchReducer,
  mixin: mixinReducer
};

export default combineReducers(dataCenterReducer);
