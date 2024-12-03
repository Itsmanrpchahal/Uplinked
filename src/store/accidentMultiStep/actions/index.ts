import {ActionType} from '@root/store/accidentMultiStep/actions-types';

interface AccidentMultiStepInit {
    type: ActionType.ACCIDENT_MULTISTEP_INIT;
}

interface AccidentMultiStepSuccessAction {
    type: ActionType.ACCIDENT_MULTISTEP_GET_SUCCESS;
    payload: any;
}

interface AccidentMultiStepErrorAction {
    type: ActionType.ACCIDENT_MULTISTEP_GET_FAILED;
    payload: any;
}

export type Action =
    | AccidentMultiStepInit
    | AccidentMultiStepSuccessAction
    | AccidentMultiStepErrorAction;