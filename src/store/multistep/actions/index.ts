import { ActionType_Multi_Step } from '@root/store/multistep/actions-types';

interface MultiStepInit {
    type: ActionType_Multi_Step.MULTISTEP_INIT;
}

interface MultiStepSuccessAction {
    type: ActionType_Multi_Step.MULTISTEP_GET_SUCCESS;
    payload: any;
}

interface MultiStepErrorAction {
    type: ActionType_Multi_Step.MULTISTEP_GET_FAILED;
    payload: any;
}

export type Action =
    | MultiStepInit
    | MultiStepSuccessAction
    | MultiStepErrorAction;
