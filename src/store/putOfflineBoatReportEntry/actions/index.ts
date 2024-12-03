import { ActionType_Offline_Boat_Report } from '@root/store/putOfflineBoatReportEntry/actions-types';

interface OfflineBoatReportInit {
    type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_INIT;
}

interface OfflineBoatReportSuccessAction {
    type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_GET_SUCCESS;
    payload: [];
}

interface OfflineBoatReportErrorAction {
    type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_GET_FAILED;
    payload: any;
}

interface OfflineBoatReportUpdateAction {
    type: ActionType_Offline_Boat_Report.OFFLINE_BOAT_REPORT_UPDATE;
    payload: any;
}

export type Action =
    | OfflineBoatReportInit
    | OfflineBoatReportSuccessAction
    | OfflineBoatReportErrorAction
    | OfflineBoatReportUpdateAction;
