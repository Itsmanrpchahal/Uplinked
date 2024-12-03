import { ActionType_Offline_Intoxication } from '@root/store/putOfflineIntoxicationEntry/actions-types';

interface OfflineIntoxicationInit {
    type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_INIT;
}

interface OfflineIntoxicationSuccessAction {
    type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_GET_SUCCESS;
    payload: [];
}

interface OfflineIntoxicationErrorAction {
    type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_GET_FAILED;
    payload: any;
}

interface OfflineIntoxicationUpdateAction {
    type: ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_UPDATE;
    payload: any;
}

export type Action =
    | OfflineIntoxicationInit
    | OfflineIntoxicationSuccessAction
    | OfflineIntoxicationErrorAction
    | OfflineIntoxicationUpdateAction;
