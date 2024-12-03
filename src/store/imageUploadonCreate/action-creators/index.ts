import { Dispatch } from 'redux';
import { ActionType } from '@root/store/imageUploadonCreate/actions-types';
import { Action } from '@root/store/imageUploadonCreate/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * @param fn
 */
export const imageUploadonCreate = (fn: any) => {
  
    return  (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCREATE_UPLOAD_INIT,
        });

        try {
            dispatch({
                type: ActionType.ONCREATE_UPLOAD_GET_SUCCESS,
                payload: fn,
            });
           
            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType.ONCREATE_UPLOAD_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });

        }
    };
};
 
