import { ActionType_Offline_Vehicle_Report } from '@root/store/putOfflineVehicleReportEntry/actions-types';

interface OfflineVehicleReportInit {
    type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_INIT;
}

interface OfflineVehicleReportSuccessAction {
    type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_GET_SUCCESS;
    payload: [];
}

interface OfflineVehicleReportErrorAction {
    type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_GET_FAILED;
    payload: any;
}

interface OfflineVehicleReportUpdateAction {
    type: ActionType_Offline_Vehicle_Report.OFFLINE_VEHICLE_REPORT_UPDATE;
    payload: any;
}

export type Action =
    | OfflineVehicleReportInit
    | OfflineVehicleReportSuccessAction
    | OfflineVehicleReportErrorAction
    | OfflineVehicleReportUpdateAction;
