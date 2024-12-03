import { Dispatch } from 'redux';
import { ActionType } from '@root/store/vehicle/actions-types';
import { Action } from '@root/store/vehicle/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const addVehicle = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.VEHICLE_INIT,
        });
        try {
            const response = await service.post(apiUri.reports.addVehicle ,fn);
            dispatch({
                type: ActionType.VEHICLE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.VEHICLE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const getVehicle = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.VEHICLE_INIT,
        });
        try {
            const response = await service.get(apiUri.reports.getVehicle +fn.id);
            dispatch({
                type: ActionType.VEHICLE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.VEHICLE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const updateVehicle = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.VEHICLE_INIT,
        });
        try {
            const response = await service.put(apiUri.reports.updateVehicle ,fn);
            dispatch({
                type: ActionType.VEHICLE_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.VEHICLE_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};