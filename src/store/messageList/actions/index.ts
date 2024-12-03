import { ActionType } from '@root/store/messageList/actions-types';

interface MessageListInit {
    type: ActionType.MESSAGE_LIST_INIT;
}

interface MessageListSuccessAction {
    type: ActionType.MESSAGE_LIST_GET_SUCCESS;
    payload: number;
}

interface MessageListErrorAction {
    type: ActionType.MESSAGE_LIST_GET_FAILED;
    payload: string;
}

export type Action =
    | MessageListInit
    | MessageListSuccessAction
    | MessageListErrorAction;
