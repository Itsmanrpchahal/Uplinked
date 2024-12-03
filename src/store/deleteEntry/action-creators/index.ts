import { Dispatch } from 'redux';
import { ActionType } from '@root/store/deleteEntry/actions-types';
import { Action } from '@root/store/deleteEntry/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const deleteReportEntry = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETE_REPORT_INIT,
        });
        try {
            const response = await service.delete(apiUri.shifts.deleteReportEntry +fn.id);
            dispatch({
                type: ActionType.DELETE_REPORT_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.DELETE_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

