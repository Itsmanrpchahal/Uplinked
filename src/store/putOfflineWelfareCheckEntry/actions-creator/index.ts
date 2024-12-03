import { Dispatch } from 'redux';
import { ActionType_Offline_Welfare_Check } from '@root/store/putOfflineWelfareCheckEntry/actions-types';
import { Action } from '@root/store/putOfflineWelfareCheckEntry/actions';
/**
 * @param fn
 */
export const putOfflineWelfareCheckEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
