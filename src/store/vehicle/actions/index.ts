import { ActionType } from '@root/store/vehicle/actions-types';

interface VehicleInit {
    type: ActionType.VEHICLE_INIT;
}

interface VehicleSuccessAction {
    type: ActionType.VEHICLE_GET_SUCCESS;
    payload: {};
}

interface VehicleErrorAction {
    type: ActionType.VEHICLE_GET_FAILED;
    payload: any;
}

export type Action = VehicleInit | VehicleSuccessAction | VehicleErrorAction;
