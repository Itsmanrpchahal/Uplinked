import { ActionType_Offline_Fire_Alarm } from '@root/store/putOfflineFireAlarmEntry/actions-types';

interface OfflineFireAlarmInit {
    type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_INIT;
}

interface OfflineFireAlarmSuccessAction {
    type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_GET_SUCCESS;
    payload: [];
}

interface OfflineFireAlarmErrorAction {
    type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_GET_FAILED;
    payload: any;
}

interface OfflineFireAlarmUpdateAction {
    type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_UPDATE;
    payload: any;
}

export type Action =
    | OfflineFireAlarmInit
    | OfflineFireAlarmSuccessAction
    | OfflineFireAlarmErrorAction
    | OfflineFireAlarmUpdateAction;
