import { ActionType } from '@root/store/armHoldUp/actions-types';

interface ArmHoldUpInit {
    type: ActionType.ARMED_HOLDUP_INIT;
}

interface ArmHoldUpSuccessAction {
    type: ActionType.ARMED_HOLDUP_GET_SUCCESS;
    payload: {};
}

interface ArmHoldUpErrorAction {
    type: ActionType.ARMED_HOLDUP_GET_FAILED;
    payload: any;
}

export type Action = ArmHoldUpInit | ArmHoldUpSuccessAction | ArmHoldUpErrorAction;
