import { Dispatch } from 'redux';
import { ActionType } from '@root/store/shift-reports/actions-types';
import { Action } from '@root/store/shift-reports/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {
    CreateReportEntryForShiftInterface,
    ShiftReportsInterface,
    ShiftReportAttachmentInterface,
    EndShiftInterface,
    StartShiftInterface,
} from '../interfaces';
import Snackbar from 'react-native-snackbar';

/**
 * @param fn
 */
export const getShiftsReportsEntries = (fn: ShiftReportsInterface) => {
   
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_REPORT_INIT,
        });
        try {
            const response = await service.get(
                apiUri.shifts.getShiftReports + fn.id + '/reports',
            );
            dispatch({
                type: ActionType.SHIFT_REPORT_GET_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const createReportEntryForShift = (
    fn: CreateReportEntryForShiftInterface,
) => {

    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CREATE_PATROL_ENTRY_INIT,
        });
        try {
            const response = await service[
                fn.type === 'create' ? 'post' : 'put'
            ](fn.url, fn.create);
            dispatch({
                type: ActionType.CREATE_PATROL_ENTRY_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.CREATE_PATROL_ENTRY_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const uploadAttachmentShiftReportsEntries = (data: FormData) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_INIT,
        });
        try {
            const response = await service.post(
                apiUri.shifts.shiftReportImageUpload,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            dispatch({
                type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            Snackbar.show({
                text: e.response.statusText,
                duration: Snackbar.LENGTH_SHORT,
              });
            // dispatch({
            //     type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_FAILED,
            //     payload: 'Something went wrong! Please try again later',
            // });
        }
    };
};

/**
 * @param fn
 */
export const getShiftsReportsEntrieAttachments = (
    fn: ShiftReportsInterface,
) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_ATTACHMENT_PATROL_ENTRY_INIT,
        });
        try {
            const response = await service.get(
                apiUri.shifts.getShiftReportFiles + fn.id,
            );
            dispatch({
                type: ActionType.GET_ATTACHMENT_PATROL_ENTRY_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.GET_ATTACHMENT_PATROL_ENTRY_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

export const deleteShiftReportAttacments = (
    fn: ShiftReportAttachmentInterface,
) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_INIT });

        try {
            const response = await service.delete(
                apiUri.shifts.deleteShiftReportFile + fn.id,
                
                {
                    headers: {
                        'g-org': fn.orgID,
                    },
                }
            );

            dispatch({
                type: ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

export const setShiftReportEntryID = (fn: ShiftReportAttachmentInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_SHIFT_REPORT_ENTRY_ID,
            payload: fn.id,
        });
    };
};

/**
 * @param fn
 */
export const startShiftAction = (fn: StartShiftInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.START_SHIFT_INIT,
        });
        try {
            const response = await service.post(
                apiUri.shifts.startShift,
                fn.type === 'auto' ? fn.startAuto : fn.startManual,
                {
                    headers: {
                        'g-org': fn.orgID,
                    },
                },
            );
            dispatch({
                type: ActionType.START_SHIFT_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.START_SHIFT_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const endShiftAction = (fn: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.END_SHIFT_INIT,
        });
        try {
            const response = await service.post(
                apiUri.shifts.endShift,
                fn.item,
                {
                    headers: {
                        'g-org': fn.orgID,
                    },
                },
            );
            dispatch({
                type: ActionType.END_SHIFT_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.END_SHIFT_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};