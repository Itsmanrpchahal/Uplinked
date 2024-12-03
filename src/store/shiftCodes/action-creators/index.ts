import { Dispatch } from 'redux';
import { ActionType } from '@root/store/shiftCodes/actions-types';
import { Action } from '@root/store/shiftCodes/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getShiftCodes = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_CODE_INIT,
        });
        try {
            const response = await service.get(apiUri.shifts.shiftCodes +fn);
            dispatch({
                type: ActionType.SHIFT_CODE_GET_SUCCESS,
                payload: response.data,
            });
           
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_CODE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });

        }
    };
};
 
