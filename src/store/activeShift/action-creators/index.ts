import { Dispatch } from 'redux';
import { ActionType } from '@root/store/activeShift/actions-types';
import { Action } from '@root/store/activeShift/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { ActiveShiftInterface } from '../interfaces';

/**
 * @param fn
 */
export const getActiveShift = (fn: ActiveShiftInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ACTIVE_SHIFT_INIT,
        });
        try {
            const response = await service.get(apiUri.shifts.activeShift,);
            dispatch({
                type: ActionType.ACTIVE_SHIFT_GET_SUCCESS,
                payload: response.data,
            });


            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ACTIVE_SHIFT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
