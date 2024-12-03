import {ActionType} from '@root/store/fontSize/actions-types';

interface FontSizeInit {
    type: ActionType.FONTSIZE_INIT;
}

interface FontSizeSuccessAction {
    type: ActionType.FONTSIZE_GET_SUCCESS;
    payload: boolean;
}

interface FontSizeErrorAction {
    type: ActionType.FONTSIZE_GET_FAILED;
    payload: boolean;
}

export type Action =
    | FontSizeInit
    | FontSizeSuccessAction
    | FontSizeErrorAction;