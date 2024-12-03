import produce from 'immer';
import { Action } from '@root/store/putOfflineBoatReportEntry/actions';
import { ActionType_Offline_Boat_Report } from '@root/store/putOfflineBoatReportEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlineBoatReport: boolean;
    error: string | null;
    offlineBoatReportListData: any;
    index: any;
}

const initialState = {
    loading_offlineBoatReport: false,
    error: null,
    offlineBoatReportListData: [],
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
            case ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_INIT:
                draft.loading_offlineBoatReport = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_GET_SUCCESS:
                draft.loading_offlineBoatReport = false;
                draft.error = null;
                draft.offlineBoatReportListData.push(action.payload);
                return draft;
            case ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_GET_FAILED:
                draft.loading_offlineBoatReport = false;
                draft.error = action.payload;
                draft.offlineBoatReportListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
