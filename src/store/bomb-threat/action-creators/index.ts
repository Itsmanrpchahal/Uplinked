import { Dispatch } from 'redux';
import { ActionType } from '@root/store/bomb-threat/actions-types';
import { Action } from '@root/store/bomb-threat/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const addBombThreat = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BOMB_THREAT_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addBombThreat ,fn);
            dispatch({
                type: ActionType.BOMB_THREAT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.BOMB_THREAT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getBombThreat = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BOMB_THREAT_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getBombThreat +fn.id);
            dispatch({
                type: ActionType.BOMB_THREAT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.BOMB_THREAT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const updateBombThreat = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BOMB_THREAT_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateBombThreat ,fn);
            dispatch({
                type: ActionType.BOMB_THREAT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.BOMB_THREAT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};