import { Dispatch } from 'redux';
import { ActionType_Offline_Upload_Attachment } from '@root/store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { Action } from '@root/store/putOfflineUploadAttachmentShiftReportsEntries/actions';

/**
 * @param fn
 */
export const putOfflineUploadAttachmentShiftReportEntries = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
