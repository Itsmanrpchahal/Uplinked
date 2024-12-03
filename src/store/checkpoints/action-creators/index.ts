import { Dispatch } from 'redux';
import { ActionType } from '@root/store/checkpoints/actions-types';
import { Action } from '@root/store/checkpoints/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ScannedCheckedPointsInterface,
    ShiftCheckPointsInterface,
} from '../interfaces';
import {SHIFT_ID} from "../../../utils/constants";
import Snackbar from 'react-native-snackbar';

/**
 * @param fn
 */
export const getShiftsCheckPointsEntries = (fn: ShiftCheckPointsInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_CHECKPOINTS_INIT,
        });

        try {
            const response = await service.get(
                apiUri.shifts.getScannedCheckPoints + fn.id + '/checkpoints',
            );
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};


/**
 * @param fn
 */
 export const deleteCheckPoint = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_CHECKPOINTS_INIT,
        });

        try {
            const response = await service.delete(
                apiUri.shifts.deleteCheckPoint + fn.id,
            );
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
/**
 * @param fn
 */
export const setScannedCheckPointsEntries = (
    fn: ScannedCheckedPointsInterface,
) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_CHECKPOINTS_INIT,
        });

        try {
            const response = await service.post(
                apiUri.shifts.scanNewShiftCheckPoint,
                fn.item,
            );
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS,
                payload: response.data,
            });
            AsyncStorage.setItem('SCANNED_ITEM', '')
            AsyncStorage.setItem(SHIFT_ID, '')

            return response;
        } catch (e: any) {
        Snackbar.show({
            text: e.statusText,
            duration: Snackbar.LENGTH_SHORT,
          });
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
            
        }
    };
};
