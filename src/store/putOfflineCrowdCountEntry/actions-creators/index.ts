import { Dispatch } from 'redux';
import { ActionType_Offline_Crowd_Count } from '@root/store/putOfflineCrowdCountEntry/actions-types';
import { Action } from '@root/store/putOfflineCrowdCountEntry/actions';

/**
 * @param fn
 */
export const putOfflineCrowdCountEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
