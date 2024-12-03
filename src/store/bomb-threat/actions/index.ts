import { ActionType } from '@root/store/bomb-threat/actions-types';

interface BombThreatInit {
    type: ActionType.BOMB_THREAT_INIT;
}

interface BombThreatSuccessAction {
    type: ActionType.BOMB_THREAT_GET_SUCCESS;
    payload: {};
}

interface BombThreatErrorAction {
    type: ActionType.BOMB_THREAT_GET_FAILED;
    payload: any;
}

export type Action = BombThreatInit | BombThreatSuccessAction | BombThreatErrorAction;
