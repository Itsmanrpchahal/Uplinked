import { Dispatch } from 'redux';
import { ActionType } from '@root/store/orgCode/actions-types';
import { Action } from '@root/store/orgCode/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { OrgCodeInterface } from '../interfaces';
import { storeData } from 'storage';
import { storageConstants } from 'storage/storage-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @param fn
 */
export const getOrgCode = (fn: OrgCodeInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ORG_CODE_INIT,
        });
        try {
            const response = await service.post("https://uplinked-dir.azurewebsites.net/api/"+apiUri.orgCode.orgCode , fn);
            dispatch({
                type: ActionType.ORG_CODE_GET_SUCCESS,
                payload: response.data,
            });
             await storeData(storageConstants.apiUrl, response.data.apiUrl);
             dispatch(setBase_Url(response.data.apiUrl))
             
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ORG_CODE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


export const setBase_Url = (fn: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_BASE_URL_SUCCESS,
            payload: fn,
            
        });
    };
};