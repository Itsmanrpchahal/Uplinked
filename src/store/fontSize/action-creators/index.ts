import { Dispatch } from 'redux';
import { ActionType } from '@root/store/fontSize/actions-types';
import { Action } from '@root/store/fontSize/actions';
import {FontSizeInterface} from "../interfaces";

/**
 * @param fn
 */
export const getFontSize = (fn: FontSizeInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FONTSIZE_INIT,
        });

            const response = fn.fontSize
            dispatch({
                type: ActionType.FONTSIZE_GET_SUCCESS,
                payload: response,
            });

            return response;

    };
};
