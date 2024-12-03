import produce from 'immer';
import { Action } from '@root/store/putOfflineUploadAttachmentShiftReportsEntries/actions';
import { ActionType_Offline_Upload_Attachment } from '@root/store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';

interface RepositoriesStateInterface {
    loading_offlineUploadAttachmentShift: boolean;
    error: string | null;
    offlineUploadAttachmentShiftListData: any;
    index: any;
}

const initialState = {
    loading_offlineUploadAttachmentShift: false,
    error: null,
    offlineUploadAttachmentShiftListData: [],
    index: 0,
};

/**
 * @param state
 * @param action
 */
const reducer = (
    state: RepositoriesStateInterface = initialState,
    action: Action,
): RepositoriesStateInterface =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_INIT:
                draft.loading_offlineUploadAttachmentShift = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_SUCCESS:
                draft.loading_offlineUploadAttachmentShift = false;
                draft.error = null;
                draft.offlineUploadAttachmentShiftListData.push(action.payload);
                return draft;
            case ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED:
                draft.loading_offlineUploadAttachmentShift = false;
                draft.error = action.payload;
                draft.offlineUploadAttachmentShiftListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
