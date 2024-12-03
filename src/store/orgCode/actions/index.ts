import { ActionType } from '@root/store/orgCode/actions-types';

interface OrgCodeInit {
    type: ActionType.ORG_CODE_INIT;
}

interface OrgCodeSuccessAction {
    type: ActionType.ORG_CODE_GET_SUCCESS;
    payload: {};
}


interface OrgCodeErrorAction {
    type: ActionType.ORG_CODE_GET_FAILED;
    payload: string;
}

export type Action = OrgCodeInit | OrgCodeSuccessAction | OrgCodeErrorAction;
