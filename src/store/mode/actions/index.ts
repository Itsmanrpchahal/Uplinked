import {ActionType} from '@root/store/mode/actions-types';

interface ActionsInit {
    type: ActionType.MODE_INIT;
}

interface ActionSuccessAction {
    type: ActionType.MODE_GET_SUCCESS;
    payload: boolean;
}

interface ActionErrorAction {
    type: ActionType.MODE_GET_FAILED;
    payload: boolean;
}

export type Action =
    | ActionsInit
    | ActionSuccessAction
    | ActionErrorAction;