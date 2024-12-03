import { ActionType } from '@root/store/actions/actions-types';

interface ActionsInit {
    type: ActionType.ACTIONS_INIT;
}

interface ActionSuccessAction {
    type: ActionType.ACTIONS_GET_SUCCESS;
    payload: ItemData[];
}

type ItemData = {
    status: string;
    actions: actionType;
};

type actionType = {
    actionID: number;
    actionDescription: string;
    actionType: string;
    actionByDate: string;
    actionByDateText: string;
};

interface ActionErrorAction {
    type: ActionType.ACTIONS_GET_FAILED;
    payload: string;
}

export type Action = ActionsInit | ActionSuccessAction | ActionErrorAction;
