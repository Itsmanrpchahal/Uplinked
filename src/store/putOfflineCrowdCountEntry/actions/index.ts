import { ActionType_Offline_Crowd_Count } from '@root/store/putOfflineCrowdCountEntry/actions-types';

interface OfflineCrowdCountInit {
    type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_INIT;
}

interface OfflineCrowdCountSuccessAction {
    type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_GET_SUCCESS;
    payload: [];
}

interface OfflineCrowdCountErrorAction {
    type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_GET_FAILED;
    payload: any;
}

interface OfflineCrowdCountUpdateAction {
    type: ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_UPDATE;
    payload: any;
}

export type Action =
    | OfflineCrowdCountInit
    | OfflineCrowdCountSuccessAction
    | OfflineCrowdCountErrorAction
    | OfflineCrowdCountUpdateAction;
