import { ActionType } from '@root/store/log/actions-types';

interface InitLogReport {
    type: ActionType.LOG_INIT;
}

interface SuccessLogReports {
    type: ActionType.LOG_GET_SUCCESS;
    payload: any;
}

interface FailedLogReports {
    type: ActionType.LOG_GET_FAILED;
    payload: string;
}


export type Action =
    | InitLogReport
    | SuccessLogReports
    | FailedLogReports