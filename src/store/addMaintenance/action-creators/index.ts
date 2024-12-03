import { Dispatch } from 'redux';
import { ActionType } from '@root/store/addMaintenance/actions-types';
import { Action } from '@root/store/addMaintenance/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const addMaintenance = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_MAINTENANCE_INIT,
        });
        try {
            
            const response = await service.post(apiUri.shifts.addMaintenance,data);
            dispatch({
                type: ActionType.ADD_MAINTENANCE_GET_SUCCESS,
                payload: response.data,
            });


            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ADD_MAINTENANCE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const getMaintenance = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_MAINTENANCE_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getMaintenance +fn.id);
            dispatch({
                type: ActionType.ADD_MAINTENANCE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ADD_MAINTENANCE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const updateMaintenance = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_MAINTENANCE_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateMaintenance ,fn);
            dispatch({
                type: ActionType.ADD_MAINTENANCE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ADD_MAINTENANCE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
