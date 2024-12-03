import { Dispatch } from 'redux';
import { ActionType } from '@root/store/armHoldUp/actions-types';
import { Action } from '@root/store/armHoldUp/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const setArmedHoldUp = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ARMED_HOLDUP_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addArmedHoldUp ,fn);
            dispatch({
                type: ActionType.ARMED_HOLDUP_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ARMED_HOLDUP_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getArmedHoldUp = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ARMED_HOLDUP_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getArmedHoldUp +fn.id);
            dispatch({
                type: ActionType.ARMED_HOLDUP_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ARMED_HOLDUP_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const updateArmedHoldUp = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ARMED_HOLDUP_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateArmedHoldUp ,fn);
            dispatch({
                type: ActionType.ARMED_HOLDUP_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ARMED_HOLDUP_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};