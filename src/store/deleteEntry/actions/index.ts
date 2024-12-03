import { ActionType } from '@root/store/deleteEntry/actions-types';

interface DeleteReportInit {
    type: ActionType.DELETE_REPORT_INIT;
}

interface DeleteReportSuccessAction {
    type: ActionType.DELETE_REPORT_GET_SUCCESS;
    payload: {};
}

interface DeleteReportErrorAction {
    type: ActionType.DELETE_REPORT_GET_FAILED;
    payload: any;
}

export type Action = DeleteReportInit | DeleteReportSuccessAction | DeleteReportErrorAction;
