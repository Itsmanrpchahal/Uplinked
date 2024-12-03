import { ActionType } from '@root/store/locationLog/actions-types';

interface LocationLogInit {
    type: ActionType.LOCATION_LOG_INIT;
}

interface LocationLogSuccessAction {
    type: ActionType.LOCATION_LOG_GET_SUCCESS;
    payload: {};
}

interface LocationLogErrorAction {
    type: ActionType.LOCATION_LOG_GET_FAILED;
    payload: {};
}

export type Action =
    | LocationLogInit
    | LocationLogSuccessAction
    | LocationLogErrorAction;
