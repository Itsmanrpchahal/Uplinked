import { Dispatch } from 'redux';
import { ActionType } from '@root/store/accident/actions-types';
import { Action } from '@root/store/accident/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const addAccident = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ACCIDENT_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addAccident ,fn);
            dispatch({
                type: ActionType.ACCIDENT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            
            dispatch({
                type: ActionType.ACCIDENT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getAccident = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ACCIDENT_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getAccident +fn.id);
            dispatch({
                type: ActionType.ACCIDENT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ACCIDENT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const updateAccident = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ACCIDENT_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateAccident ,fn);
            dispatch({
                type: ActionType.ACCIDENT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ACCIDENT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};