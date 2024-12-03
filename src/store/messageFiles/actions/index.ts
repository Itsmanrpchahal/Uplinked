import { ActionType } from '@root/store/messageFiles/actions-types';

interface MessageFilesInit {
    type: ActionType.MESSAGE_FILES_INIT;
}

interface MessageFilesSuccessAction {
    type: ActionType.MESSAGE_FILES_GET_SUCCESS;
    payload: number;
}

interface MessageFilesErrorAction {
    type: ActionType.MESSAGE_FILES_GET_FAILED;
    payload: string;
}

export type Action =
    | MessageFilesInit
    | MessageFilesSuccessAction
    | MessageFilesErrorAction;
