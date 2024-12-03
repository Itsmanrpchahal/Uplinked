import { ActionType } from '@root/store/boatReport/actions-types';

interface BoatReportInit {
    type: ActionType.BOAT_REPORT_INIT;
}

interface BoatReportSuccessAction {
    type: ActionType.BOAT_REPORT_GET_SUCCESS;
    payload: {};
}

interface BoatReportErrorAction {
    type: ActionType.BOAT_REPORT_GET_FAILED;
    payload: any;
}

export type Action = BoatReportInit | BoatReportSuccessAction | BoatReportErrorAction;
