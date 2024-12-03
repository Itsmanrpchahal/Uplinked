import { Dispatch } from 'redux';
import { ActionType } from '@root/store/boatReport/actions-types';
import { Action } from '@root/store/boatReport/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const setBoatReport = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BOAT_REPORT_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addBoatReport ,fn);
            dispatch({
                type: ActionType.BOAT_REPORT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.BOAT_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getBoatReport = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BOAT_REPORT_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getBoatReport +fn.id);
            dispatch({
                type: ActionType.BOAT_REPORT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.BOAT_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
 export const updateBoatReport = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BOAT_REPORT_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateBoatReport ,fn);
            dispatch({
                type: ActionType.BOAT_REPORT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.BOAT_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};