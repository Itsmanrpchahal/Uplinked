import { ActionType } from '@root/store/orgID/actions-types';

interface ActionsInit {
    type: ActionType.ORGID_INIT;
}

interface ActionSuccessAction {
    type: ActionType.ORGID_GET_SUCCESS;
    payload: {};
}

interface ActionErrorAction {
    type: ActionType.ORGID_GET_FAILED;
    payload: string;
}

export type Action = ActionsInit | ActionSuccessAction | ActionErrorAction;
