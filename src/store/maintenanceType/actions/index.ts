import { ActionType } from '@root/store/maintenanceType/actions-types';

interface MaintenanceTypeInit {
    type: ActionType.MAINTENANCE_TYPE_INIT;
}

interface MaintenanceTypeSuccessAction {
    type: ActionType.MAINTENANCE_TYPE_GET_SUCCESS;
    payload: [];
}

interface MaintenanceTypeErrorAction {
    type: ActionType.MAINTENANCE_TYPE_GET_FAILED;
    payload: [];
}

export type Action =
    | MaintenanceTypeInit
    | MaintenanceTypeSuccessAction
    | MaintenanceTypeErrorAction;
