import { Dispatch } from 'redux';
import { ActionType_Offline_Maintenance } from '@root/store/putOfflineMaintenanceEntry/actions-types';
import { Action } from '@root/store/putOfflineMaintenanceEntry/actions';

/**
 * @param fn
 */
export const putOfflineMaintenanceEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
