import { ActionType } from '@root/store/intoxication/actions-types';

interface IntoxicationInit {
    type: ActionType.INTOXICATION_INIT;
}

interface IntoxicationSuccessAction {
    type: ActionType.INTOXICATION_GET_SUCCESS;
    payload: {};
}

interface IntoxicationErrorAction {
    type: ActionType.INTOXICATION_GET_FAILED;
    payload: any;
}

export type Action = IntoxicationInit | IntoxicationSuccessAction | IntoxicationErrorAction;
