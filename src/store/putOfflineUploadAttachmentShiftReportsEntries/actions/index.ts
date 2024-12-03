import { ActionType_Offline_Upload_Attachment } from '@root/store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';

interface OfflineUploadAttachmentShiftInit {
    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_INIT;
}

interface OfflineUploadAttachmentShiftSuccessAction {
    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_SUCCESS;
    payload: [];
}

interface OfflineUploadAttachmentShiftErrorAction {
    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED;
    payload: any;
}

interface OfflineUploadAttachmentShiftUpdateAction {
    type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_UPDATE;
    payload: any;
}

export type Action =
    | OfflineUploadAttachmentShiftInit
    | OfflineUploadAttachmentShiftSuccessAction
    | OfflineUploadAttachmentShiftErrorAction
    | OfflineUploadAttachmentShiftUpdateAction;
