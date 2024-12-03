import { Dispatch } from 'redux';
import { ActionType_Offline_Intoxication } from '@root/store/putOfflineIntoxicationEntry/actions-types';
import { Action } from '@root/store/putOfflineIntoxicationEntry/actions';

/**
 * @param fn
 */
export const putOfflineIntoxicationEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
