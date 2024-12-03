import { ActionType } from '@root/store/shiftCodes/actions-types';

interface ShiftCodeInit {
    type: ActionType.SHIFT_CODE_INIT;
}

interface ShiftCodeSuccessAction {
    type: ActionType.SHIFT_CODE_GET_SUCCESS;
    payload: {};
}

interface ShiftCodeErrorAction {
    type: ActionType.SHIFT_CODE_GET_FAILED;
    payload: any;
}

export type Action = ShiftCodeInit | ShiftCodeSuccessAction | ShiftCodeErrorAction;
