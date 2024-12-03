import { Dispatch } from 'redux';
import { ActionType } from '@root/store/actions/actions-types';
import { Action } from '@root/store/actions/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { ActionsInterface } from '../interfaces';

/**
 * @param fn
 */
export const getActions = (fn: ActionsInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ACTIONS_INIT,
        });
        try {
            const response = await service.get(apiUri.shifts.actions + fn.status,);
            dispatch({
                type: ActionType.ACTIONS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ACTIONS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
