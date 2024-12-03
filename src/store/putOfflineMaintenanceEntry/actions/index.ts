import { ActionType_Offline_Maintenance } from '@root/store/putOfflineMaintenanceEntry/actions-types';

interface OfflineMaintenanceInit {
    type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_INIT;
}

interface OfflineMaintenanceSuccessAction {
    type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_GET_SUCCESS;
    payload: [];
}

interface OfflineMaintenanceErrorAction {
    type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_GET_FAILED;
    payload: any;
}

interface OfflineMaintenanceUpdateAction {
    type: ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_UPDATE;
    payload: any;
}

export type Action =
    | OfflineMaintenanceInit
    | OfflineMaintenanceSuccessAction
    | OfflineMaintenanceErrorAction
    | OfflineMaintenanceUpdateAction;
