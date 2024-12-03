import { Dispatch } from 'redux';
import { ActionType } from '@root/store/log/actions-types';
import { Action } from '@root/store/log/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { LogInterface,} from '../interfaces';

/**
 * @param fn
 */
export const setLogReport = (fn: LogInterface) => {
    return async (dispatch: Dispatch<Action>) => {

        dispatch({
            type: ActionType.LOG_INIT,
        });
        try {
            const response = await service.post(
                apiUri.logs.log + fn ,
            );
            dispatch({
                type: ActionType.LOG_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            // dispatch({
            //     type: ActionType.LOG_GET_FAILED,
            //     payload: 'Something went wrong! Please try again later',
            // });
        }
    };
};

