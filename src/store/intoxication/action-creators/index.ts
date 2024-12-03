import { Dispatch } from 'redux';
import { ActionType } from '@root/store/intoxication/actions-types';
import { Action } from '@root/store/intoxication/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const setIntoxication = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.INTOXICATION_INIT,
        });
        try {
            const response = await service.post(apiUri.shifts.addIntoxication ,fn);
            dispatch({
                type: ActionType.INTOXICATION_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.INTOXICATION_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getIntoxication = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.INTOXICATION_INIT,
        });
        try {
            const response = await service.get(apiUri.shifts.getIntoxication +fn.id);
            dispatch({
                type: ActionType.INTOXICATION_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.INTOXICATION_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const updateIntoxication = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.INTOXICATION_INIT,
        });
        try {
            const response = await service.put(apiUri.shifts.updateIntoxication ,fn);
            dispatch({
                type: ActionType.INTOXICATION_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.INTOXICATION_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};