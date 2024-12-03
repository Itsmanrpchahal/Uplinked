import { ActionType } from '@root/store/auth/actions-types';

interface LoginAction {
    type: ActionType.LOGIN;
}

interface LoginSuccessAction {
    type: ActionType.LOGIN_SUCCESS;
    payload: LoginSuccessResponseObject;
}

interface LoginSuccessResponseObject {
    accessToken: string;
    userName: string;
    refreshToken: string;
}

interface LoginErrorAction {
    type: ActionType.LOGIN_ERROR;
    payload: string;
}

interface SetAuthentication {
    type: ActionType.SET_AUTHENTICATION;
    payload: boolean;
}

interface SetOrgID {
    type: ActionType.SET_ORG_ID;
    payload: number;
}

export type Action =
    | LoginAction
    | LoginSuccessAction
    | LoginErrorAction
    | SetAuthentication
    | SetOrgID;
