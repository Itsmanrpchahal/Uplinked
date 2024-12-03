import { Dispatch } from 'redux';
import { ActionType_Offline_Boat_Report } from '@root/store/putOfflineBoatReportEntry/actions-types';
import { Action } from '@root/store/putOfflineBoatReportEntry/actions';

/**
 * @param fn
 */
export const putOfflineBoatReportEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
