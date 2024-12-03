import { Dispatch } from 'redux';
import { ActionType } from '@root/store/mode/actions-types';
import { Action } from '@root/store/mode/actions';
import {ModeInterface} from "../interfaces";

/**
 * @param fn
 */
export const getMode = (fn: ModeInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MODE_INIT,
        });
            const response = fn.mode
            dispatch({
                type: ActionType.MODE_GET_SUCCESS,
                payload: response,
            });

            return response;

    };
};
