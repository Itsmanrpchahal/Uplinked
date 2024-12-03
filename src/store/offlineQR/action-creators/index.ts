import { Dispatch } from 'redux';
import { ActionType_OfflineQR } from '@root/store/offlineQR/actions-types';
import { Action } from '@root/store/offlineQR/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * @param fn
 */
export const putOfflineQR = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_OfflineQR.OFFILINE_QR_INIT,
        });

        try {
            dispatch({
                type: ActionType_OfflineQR.OFFILINE_QR_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_OfflineQR.OFFILINE_QR_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
