import produce from 'immer';
import { Action } from '@root/store/shift-reports/actions';
import { ActionType } from '@root/store/shift-reports/actions-types';

interface RepositoriesStateInterface {
    shiftReportLoading: boolean;
    error: string | null;
    shiftReportData: any;
    createReportEntryLoading: boolean;
    uploadAttachmentReportEntryLoading: boolean;
    shiftReportsEntriesAttachmentsLoading: boolean;
    shiftReportsEntriesAttachments: any;
    deleteShiftReportAttachmentLoading: boolean;
    shiftReportEntryID: string;
    endShiftLoading: boolean;
    startShiftLoading: boolean;
}

const initialState = {
    shiftReportLoading: false,
    error: null,
    shiftReportData: false,
    createReportEntryLoading: false,
    uploadAttachmentReportEntryLoading: false,
    shiftReportsEntriesAttachmentsLoading: false,
    shiftReportsEntriesAttachments: [],
    deleteShiftReportAttachmentLoading: false,
    shiftReportEntryID: '',
    endShiftLoading: false,
    startShiftLoading: false,
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
            case ActionType.SHIFT_REPORT_INIT:
                draft.shiftReportLoading = true;
                draft.error = null;
                draft.shiftReportData = false;
                return draft;
            case ActionType.SHIFT_REPORT_GET_SUCCESS:
                draft.shiftReportLoading = false;
                draft.error = null;
                draft.shiftReportData = action.payload;
                return draft;
            case ActionType.SHIFT_REPORT_GET_FAILED:
                draft.shiftReportLoading = false;
                draft.error = action.payload;
                draft.shiftReportData = false;
                return draft;
            case ActionType.CREATE_PATROL_ENTRY_INIT:
                draft.createReportEntryLoading = true;
                draft.error = null;
                return draft;

            case ActionType.CREATE_PATROL_ENTRY_SUCCESS:
                draft.createReportEntryLoading = false;
                draft.error = null;
                return draft;

            case ActionType.CREATE_PATROL_ENTRY_FAILED:
                draft.createReportEntryLoading = false;
                draft.error = action.payload;
                return draft;

            case ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_INIT:
                draft.uploadAttachmentReportEntryLoading = true;
                draft.error = null;
                return draft;

            case ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_SUCCESS:
                draft.uploadAttachmentReportEntryLoading = false;
                draft.error = null;
                return draft;

            case ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_FAILED:
                draft.uploadAttachmentReportEntryLoading = false;
                draft.error = action.payload;
                return draft;

            case ActionType.GET_ATTACHMENT_PATROL_ENTRY_INIT:
                draft.shiftReportsEntriesAttachmentsLoading = true;
                draft.error = null;
                return draft;

            case ActionType.GET_ATTACHMENT_PATROL_ENTRY_SUCCESS:
                draft.shiftReportsEntriesAttachmentsLoading = false;
                draft.shiftReportsEntriesAttachments = action.payload;
                draft.error = null;
                return draft;

            case ActionType.GET_ATTACHMENT_PATROL_ENTRY_FAILED:
                draft.shiftReportsEntriesAttachmentsLoading = false;
                draft.shiftReportsEntriesAttachments = [];
                draft.error = action.payload;
                return draft;

            case ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_INIT:
                draft.deleteShiftReportAttachmentLoading = true;
                draft.error = null;
                return draft;

            case ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_SUCCESS:
                draft.deleteShiftReportAttachmentLoading = false;

                draft.error = null;
                return draft;

            case ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_FAILED:
                draft.deleteShiftReportAttachmentLoading = false;
                draft.error = action.payload;
                return draft;

            case ActionType.START_SHIFT_INIT:
                draft.startShiftLoading = true;
                draft.error = null;
                return draft;

            case ActionType.START_SHIFT_SUCCESS:
                draft.startShiftLoading = false;
                draft.error = null;
                return draft;

            case ActionType.START_SHIFT_FAILED:
                draft.startShiftLoading = false;
                draft.error = action.payload;
                return draft;

            case ActionType.END_SHIFT_INIT:
                draft.endShiftLoading = true;
                draft.error = null;
                return draft;

            case ActionType.END_SHIFT_SUCCESS:
                draft.endShiftLoading = false;
                draft.error = null;
                return draft;

            case ActionType.END_SHIFT_FAILED:
                draft.endShiftLoading = false;
                draft.error = action.payload;
                return draft;

            case ActionType.SET_SHIFT_REPORT_ENTRY_ID:
                draft.shiftReportEntryID = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
