import { Dispatch } from 'redux';
import { ActionType } from '@root/store/crowdCount/actions-types';
import { Action } from '@root/store/crowdCount/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const setCrowdCount = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CROWD_COUNT_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addCrowdCount ,fn);
            dispatch({
                type: ActionType.CROWD_COUNT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.CROWD_COUNT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getCrowdCount = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CROWD_COUNT_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getCrowdCount +fn.id);
            dispatch({
                type: ActionType.CROWD_COUNT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.CROWD_COUNT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
 export const updateCrowdCount = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CROWD_COUNT_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateCrowdCount ,fn);
            dispatch({
                type: ActionType.CROWD_COUNT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.CROWD_COUNT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};