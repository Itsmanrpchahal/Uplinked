import { ActionType_OfflineQR } from '@root/store/offlineQR/actions-types';

interface OfflineQRInit {
    type: ActionType_OfflineQR.OFFILINE_QR_INIT;
}

interface OfflineQRSuccessAction {
    type: ActionType_OfflineQR.OFFILINE_QR_GET_SUCCESS;
    payload: [];
}

interface OfflineQRErrorAction {
    type: ActionType_OfflineQR.OFFILINE_QR_GET_FAILED;
    payload: any;
}

interface OfflineQRUpdateAction {
    type: ActionType_OfflineQR.OFFLINE_QR_UPPDATE;
    payload: any;
}

export type Action =
    | OfflineQRInit
    | OfflineQRSuccessAction
    | OfflineQRErrorAction
    | OfflineQRUpdateAction;
