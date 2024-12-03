import { Dispatch } from 'redux';
import { ActionType } from '@root/store/welfare/actions-types';
import { Action } from '@root/store/welfare/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const addWelfare = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.WELFARE_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addWelfare ,fn);
            dispatch({
                type: ActionType.WELFARE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.WELFARE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getWelfare = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.WELFARE_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getWelfare +fn.id);
            dispatch({
                type: ActionType.WELFARE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.WELFARE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const updateWelfare = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.WELFARE_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateWelfare ,fn);
            dispatch({
                type: ActionType.WELFARE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.WELFARE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};