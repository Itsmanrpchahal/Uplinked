import { ActionType } from '@root/store/fireAlarm/actions-types';

interface FireAlarmInit {
    type: ActionType.FIREALARM_INIT;
}

interface FireAlarmSuccessAction {
    type: ActionType.FIREALARM_GET_SUCCESS;
    payload: {};
}

interface FireAlarmErrorAction {
    type: ActionType.FIREALARM_GET_FAILED;
    payload: any;
}

export type Action = FireAlarmInit | FireAlarmSuccessAction | FireAlarmErrorAction;
