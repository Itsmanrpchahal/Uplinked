import { ActionType } from '@root/store/crowdCount/actions-types';

interface CrowdCountInit {
    type: ActionType.CROWD_COUNT_INIT;
}

interface CrowdCountSuccessAction {
    type: ActionType.CROWD_COUNT_GET_SUCCESS;
    payload: {};
}

interface CrowdCountErrorAction {
    type: ActionType.CROWD_COUNT_GET_FAILED;
    payload: any;
}

export type Action = CrowdCountInit | CrowdCountSuccessAction | CrowdCountErrorAction;
