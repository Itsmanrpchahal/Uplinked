import {ActionType} from '@root/store/bomThreatMultiStep/actions-types';

interface BombThreatMultiStepInit {
    type: ActionType.BOMB_THREAT_MULTISTEP_INIT;
}

interface BombThreatMultiStepSuccessAction {
    type: ActionType.BOMB_THREAT_MULTISTEP_GET_SUCCESS;
    payload: any;
}

interface BombThreatMultiStepErrorAction {
    type: ActionType.BOMB_THREAT_MULTISTEP_GET_FAILED;
    payload: any;
}

export type Action =
    | BombThreatMultiStepInit
    | BombThreatMultiStepSuccessAction
    | BombThreatMultiStepErrorAction;