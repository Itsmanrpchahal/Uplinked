import { ActionType } from '@root/store/welfare/actions-types';

interface WelfareInit {
    type: ActionType.WELFARE_INIT;
}

interface WelfareSuccessAction {
    type: ActionType.WELFARE_GET_SUCCESS;
    payload: {};
}

interface WelfareErrorAction {
    type: ActionType.WELFARE_GET_FAILED;
    payload: any;
}

export type Action = WelfareInit | WelfareSuccessAction | WelfareErrorAction;
