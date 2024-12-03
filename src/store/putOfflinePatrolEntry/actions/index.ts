import { ActionType_Offline_Patrol } from '@root/store/putOfflinePatrolEntry/actions-types';

interface OfflinePatrolInit {
    type: ActionType_Offline_Patrol.OFFLINE_PATROL_INIT;
}

interface OfflinePatrolSuccessAction {
    type: ActionType_Offline_Patrol.OFFLINE_PATROL_GET_SUCCESS;
    payload: [];
}

interface OfflinePatrolErrorAction {
    type: ActionType_Offline_Patrol.OFFLINE_PATROL_GET_FAILED;
    payload: any;
}

interface OfflinePatrolUpdateAction {
    type: ActionType_Offline_Patrol.OFFLINE_PATROL_UPDATE;
    payload: any;
}

export type Action =
    | OfflinePatrolInit
    | OfflinePatrolSuccessAction
    | OfflinePatrolErrorAction
    | OfflinePatrolUpdateAction;
