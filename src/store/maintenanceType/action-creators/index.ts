import { Dispatch } from 'redux';
import { ActionType } from '@root/store/maintenanceType/actions-types';
import { Action } from '@root/store/maintenanceType/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getMaintenanceList = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MAINTENANCE_TYPE_INIT,
        });
        try {
            
            const response = await service.get(apiUri.shifts.manintenanceTypes);
            dispatch({
                type: ActionType.MAINTENANCE_TYPE_GET_SUCCESS,
                payload: response.data,
            });


            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.MAINTENANCE_TYPE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
