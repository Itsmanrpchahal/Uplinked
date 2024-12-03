import produce from 'immer';
import { Action } from '@root/store/putOfflineVehicleReportEntry/actions';
import { ActionType_Offline_Vehicle_Report } from '@root/store/putOfflineVehicleReportEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlineVehicleReport: boolean;
    error: string | null;
    offlineVehicleReportListData: any;
    index: any;
}

const initialState = {
    loading_offlineVehicleReport: false,
    error: null,
    offlineVehicleReportListData: [],
    index: 0,
};

/**
 * @param state
 * @param action
 */
const reducer = (
    state: RepositoriesStateInterface = initialState,
    action: Action,
): RepositoriesStateInterface =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_INIT:
                draft.loading_offlineVehicleReport = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_GET_SUCCESS:
                draft.loading_offlineVehicleReport = false;
                draft.error = null;
                draft.offlineVehicleReportListData.push(action.payload);
                return draft;
            case ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_GET_FAILED:
                draft.loading_offlineVehicleReport = false;
                draft.error = action.payload;
                draft.offlineVehicleReportListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
