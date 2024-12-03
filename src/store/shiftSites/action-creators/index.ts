import { Dispatch } from 'redux';
import { ActionType } from '@root/store/shiftSites/actions-types';
import { Action } from '@root/store/shiftSites/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getShiftSites = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_SITE_INIT,
        });
        try {
            const response = await service.get(apiUri.shifts.getSites +fn);
            dispatch({
                type: ActionType.SHIFT_SITE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_SITE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

