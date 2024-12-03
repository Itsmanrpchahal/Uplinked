import { ActionType_Offline_Welfare_Check } from '@root/store/putOfflineWelfareCheckEntry/actions-types';

interface OfflineWelfareCheckInit {
    type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_INIT;
}

interface OfflineWelfareCheckSuccessAction {
    type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_GET_SUCCESS;
    payload: [];
}

interface OfflineWelfareCheckErrorAction {
    type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_GET_FAILED;
    payload: any;
}

interface OfflineWelfareCheckUpdateAction {
    type: ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_UPDATE;
    payload: any;
}

export type Action =
    | OfflineWelfareCheckInit
    | OfflineWelfareCheckSuccessAction
    | OfflineWelfareCheckErrorAction
    | OfflineWelfareCheckUpdateAction;
