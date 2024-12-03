import {ActionType} from '@root/store/armholdUpMultiStep/actions-types';

interface ArmedMultiStepInit {
    type: ActionType.ARMED_MULTISTEP_INIT;
}

interface ArmedMultiStepSuccessAction {
    type: ActionType.ARMED_MULTISTEP_GET_SUCCESS;
    payload: any;
}

interface ArmedMultiStepErrorAction {
    type: ActionType.ARMED_MULTISTEP_GET_FAILED;
    payload: any;
}

export type Action =
    | ArmedMultiStepInit
    | ArmedMultiStepSuccessAction
    | ArmedMultiStepErrorAction;