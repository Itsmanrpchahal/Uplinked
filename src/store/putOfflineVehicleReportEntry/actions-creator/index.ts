import { Dispatch } from 'redux';
import { ActionType_Offline_Vehicle_Report } from '@root/store/putOfflineVehicleReportEntry/actions-types';
import { Action } from '@root/store/putOfflineVehicleReportEntry/actions';
/**
 * @param fn
 */
export const putOfflineVehicleReportEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
