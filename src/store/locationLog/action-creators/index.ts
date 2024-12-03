import { Dispatch } from 'redux';
import { ActionType } from '@root/store/locationLog/actions-types';
import { Action } from '@root/store/locationLog/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const locationLog = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOCATION_LOG_INIT,
        });
        try {
            
            const response = await service.post(apiUri.logs.locationLog,data);
            dispatch({
                type: ActionType.LOCATION_LOG_GET_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.LOCATION_LOG_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
