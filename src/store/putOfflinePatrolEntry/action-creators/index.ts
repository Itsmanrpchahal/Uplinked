import { Dispatch } from 'redux';
import { ActionType_Offline_Patrol } from '@root/store/putOfflinePatrolEntry/actions-types';
import { Action } from '@root/store/putOfflinePatrolEntry/actions';

/**
 * @param fn
 */
export const putOfflinePatrolEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Patrol.OFFLINE_PATROL_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Patrol.OFFLINE_PATROL_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Patrol.OFFLINE_PATROL_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
