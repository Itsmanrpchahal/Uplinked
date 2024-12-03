import { ActionType } from '@root/store/activeShift/actions-types';

interface ActiveShiftInit {
    type: ActionType.ACTIVE_SHIFT_INIT;
}

interface ActiveShiftSuccessAction {
    type: ActionType.ACTIVE_SHIFT_GET_SUCCESS;
    payload: number;
}

interface ActiveShiftErrorAction {
    type: ActionType.ACTIVE_SHIFT_GET_FAILED;
    payload: string;
}

export type Action =
    | ActiveShiftInit
    | ActiveShiftSuccessAction
    | ActiveShiftErrorAction;
