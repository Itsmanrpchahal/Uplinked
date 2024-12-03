import { Dispatch } from 'redux';
import { ActionType } from '@root/store/auth/actions-types';
import { Action } from '@root/store/auth/actions';
import { apiUri } from '@root/service/apiEndPoints';
import { LoginInterface, OrgCodeInterface } from '@root/interfaces/loginInterface';
import service, {setAuthInitalToken, setOrgID} from '@root/service/axios';
import { storeData } from 'storage';
import { storageConstants } from '../../../storage/storage-constants';
import { BaseUrl, LoginResponseInterface } from '../interfaces';

/**
 *
 * @param data
 */
export const login = (data: LoginInterface) => {
    
    return async (dispatch: Dispatch<Action | any>) => {
        dispatch({
            type: ActionType.LOGIN,
        });
            
        try {
            const response = await service.post(apiUri.auth.login, data);
            setAuthInitalToken(response.data.accessToken)
            await storeData(storageConstants.token, response.data.accessToken);
            dispatch(
                setUser({
                    userName: response.data.userName,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                }),
            ); 
            
            dispatch(setOrgIDForState(response.data.orgs[0].orgID));
            dispatch(setAuthentication(true));

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.LOGIN_ERROR,
                payload: 'Invalid email/password',
            });
        
        }
    };
};


/**
 * @param value
 */
export const setAuthentication = (value: boolean) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_AUTHENTICATION,
            payload: value,
        });
    };
};

/**
 *
 */
export const setUser = (fn: LoginResponseInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN_SUCCESS,
            payload: {
                userName: fn.userName,
                accessToken: fn.accessToken,
                refreshToken: fn.refreshToken,
            },
        });
    };
};
/** 
 * 
*/
export const setBase_Url = (fn: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_BASE_URL_SUCCESS,
            payload: fn,
            
        });
    };
};

/**
 * @param id
 */
export const setOrgIDForState = (id: number) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_ORG_ID,
            payload: id,
        });
    };
};
