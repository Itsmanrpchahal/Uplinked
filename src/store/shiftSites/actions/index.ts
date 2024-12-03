import { ActionType } from '@root/store/shiftSites/actions-types';

interface ShiftSiteInit {
    type: ActionType.SHIFT_SITE_INIT;
}

interface ShiftSiteSuccessAction {
    type: ActionType.SHIFT_SITE_GET_SUCCESS;
    payload: [];
}

interface ShiftSiteErrorAction {
    type: ActionType.SHIFT_SITE_GET_FAILED;
    payload: any;
}

export type Action = ShiftSiteInit | ShiftSiteSuccessAction | ShiftSiteErrorAction;
