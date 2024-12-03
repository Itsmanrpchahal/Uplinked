import { ActionType } from '@root/store/messageDetail/actions-types';

interface MessageDetailInit {
    type: ActionType.MESSAGE_DETAIL_INIT;
}

interface MessageDetailSuccessAction {
    type: ActionType.MESSAGE_DETAIL_GET_SUCCESS;
    payload: number;
}

interface MessageDetailErrorAction {
    type: ActionType.MESSAGE_DETAIL_GET_FAILED;
    payload: string;
}

export type Action =
    | MessageDetailInit
    | MessageDetailSuccessAction
    | MessageDetailErrorAction;
