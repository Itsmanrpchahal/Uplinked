import { ActionType } from '@root/store/addMaintenance/actions-types';

interface AddMaintenanceInit {
    type: ActionType.ADD_MAINTENANCE_INIT;
}

interface AddMaintenanceSuccessAction {
    type: ActionType.ADD_MAINTENANCE_GET_SUCCESS;
    payload: {};
}

interface AddMaintenanceErrorAction {
    type: ActionType.ADD_MAINTENANCE_GET_FAILED;
    payload: {};
}

export type Action =
    | AddMaintenanceInit
    | AddMaintenanceSuccessAction
    | AddMaintenanceErrorAction;
