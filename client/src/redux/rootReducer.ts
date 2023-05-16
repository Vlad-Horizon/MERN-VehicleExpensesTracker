import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import userReducer from './slices/userSlice';
import tokensReducer from './slices/tokensSlice';
import utilsReducer from './slices/utils';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};


const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user'],
};

const tokensPersistConfig = {
  key: 'tokens',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['tokens'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  tokens: persistReducer(tokensPersistConfig, tokensReducer),
  utils: utilsReducer
});

export { 
  rootPersistConfig, 
  rootReducer 
};
