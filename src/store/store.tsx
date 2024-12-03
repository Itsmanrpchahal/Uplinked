import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from '@root/store/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'auth',
        'mode',
        'fontSizeState',
        'orgCodeData',
        'rosterData',
        'offlineListData',
        'activeShift',
        'offlineListData',
        'offlinePatrolListData',
        'offlineMaintenanceListData',
        'maintainenacelistData',
        'offlineUploadAttachmentShiftListData',
        'offlineWelfareCheckListData',
        'offlineIntoxicationListData',
        'offlineVehicleReportListData',
        'offlineBoatReportListData',
        'offlineCrowdCountListData',
        'offlineFireAlarmListData',
    ],
};

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

let persistor = persistStore(store);

export { store, persistor };
