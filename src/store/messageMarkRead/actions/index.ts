import { ActionType } from '@root/store/messageMarkRead/actions-types';

interface MessageReadInit {
    type: ActionType.MESSAGE_READ_INIT;
}

interface MessageReadSuccessAction {
    type: ActionType.MESSAGE_READ_GET_SUCCESS;
    payload: number;
}

interface MessageReadErrorAction {
    type: ActionType.MESSAGE_READ_GET_FAILED;
    payload: string;
}

export type Action =
    | MessageReadInit
    | MessageReadSuccessAction
    | MessageReadErrorAction;
