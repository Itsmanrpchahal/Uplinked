import { Dispatch } from 'redux';
import { ActionType } from '@root/store/fireAlarm/actions-types';
import { Action } from '@root/store/fireAlarm/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const setFireAlarm = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FIREALARM_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addfireAlarm ,fn);
            dispatch({
                type: ActionType.FIREALARM_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.FIREALARM_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getfireAlarm = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FIREALARM_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getfireAlarm +fn.id);
            dispatch({
                type: ActionType.FIREALARM_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.FIREALARM_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const updatefireAlarm = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FIREALARM_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updatefireAlarm ,fn);
            dispatch({
                type: ActionType.FIREALARM_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.FIREALARM_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};