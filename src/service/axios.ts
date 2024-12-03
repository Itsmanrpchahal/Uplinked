import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { apiUri, baseURL } from '@root/service/apiEndPoints';
import { persistor, store } from '@root/store';
import { navigationRef } from '../navigation/RootNavigation';
import navigationStrings from '@root/navigation/navigationStrings';
import { clearAll } from '../storage';
import { ActionType } from '../store/auth/actions-types';
import Snackbar from 'react-native-snackbar';
import { NetworkInfo } from 'react-native-network-info';
import { appVersion } from 'utils/common-methods';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const state = store.getState();
// console.clear()
const instance = axios.create({
    baseURL: state.orgCodeData.orgCodeData != null  ? state.orgCodeData.orgCodeData.apiUrl : baseURL,
    timeout: 50000,
    timeoutErrorMessage: 'Timeout error',
});
let ip = '';

export const setAuthInitalToken = (token: string) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setOrgID = (orgID: string) => {
    instance.defaults.headers.common['g-org'] = `${orgID}`;
};
instance.defaults.headers.common.Authorization = `Bearer ${state.auth.accessToken}`;
instance.defaults.headers.common['g-org'] = `${state.auth.orgID}`;

NetworkInfo.getIPAddress().then((ipAddress: any) => {
    ip = ipAddress; 
});

instance.interceptors.request.use(function (config) {
    if (config.url === '/shifts/report/upload/') {
        //  alert(JSON.stringify(config))
    }
    return config;
});


instance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    async (error: any) => {
        console.log('ERRRORRR  ===>  ', error.response.status);
        if (error.response.status === 401) {
            store.dispatch({
                type: ActionType.LOGIN,
            });

            
            if (error.config.url != '/Auth/login' && error.config.url != 'https://uplinked-dir.azurewebsites.net/api/org-code') {
                await instance
                    .post(apiUri.auth.refreshToken, {
                        accessToken: store.getState().auth.accessToken,
                        refreshToken: store.getState().auth.refreshToken,
                    })
                    .then((res: any) => {
                        setAuthInitalToken(res.data.accessToken);
                        store.dispatch({
                            type: ActionType.LOGIN_SUCCESS,
                            payload: {
                                userName: state.auth.userName,
                                accessToken: res.data.accessToken,
                                refreshToken: res.data.refreshToken,
                            },
                        });
                        store.dispatch({
                            type: ActionType.SET_AUTHENTICATION,
                            payload: true,
                        });
                    })
                    .catch(async (err: any) => {
                        persistor.purge().then(async () => {
                            await clearAll();
                            store.dispatch({
                                type: ActionType.SET_AUTHENTICATION,
                                payload: false,
                            });

                            navigationRef.current.dispatch(
                                CommonActions.navigate({
                                    name: navigationStrings.LOGIN,
                                }),
                            );
                        });
                    });
            } else {
               
                alert('Invalid email/password');
            }
        } else {
            if(error.config.url != '/App/logs' && error.config.url != 'https://uplinked-dir.azurewebsites.net/api/org-code')
               {
                try {
                    instance.post(apiUri.logs.log, {
                        appVersion: appVersion,
                        requestType: error.config.method,
                        apiEndPoint: error.config.url,
                        payload: error.config.data,
                        error: error.message,
                        deviceType: Platform.OS,
                        deviceID: DeviceInfo.getModel(),
                        ipAddress: ip,
                    });
                    await AsyncStorage.setItem('ORG_CODE', '');
                    Snackbar.show({
                        text:
                            typeof error.response.data === 'object'
                                ? 'Not Found'
                                : error.response.data,
                        duration: Snackbar.LENGTH_SHORT,
                    });
                } catch (e) {}
               } else {
                Snackbar.show({
                    text:
                        'Invalid email/code',
                    duration: Snackbar.LENGTH_SHORT,
                });
               }
           
        }
        return Promise.reject(error.response);
    },
);

export default instance;
