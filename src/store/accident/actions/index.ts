import { ActionType } from '@root/store/accident/actions-types';

interface AccidentInit {
    type: ActionType.ACCIDENT_INIT;
}

interface AccidentSuccessAction {
    type: ActionType.ACCIDENT_GET_SUCCESS;
    payload: {};
}

interface AccidentErrorAction {
    type: ActionType.ACCIDENT_GET_FAILED;
    payload: any;
}

export type Action = AccidentInit | AccidentSuccessAction | AccidentErrorAction;
