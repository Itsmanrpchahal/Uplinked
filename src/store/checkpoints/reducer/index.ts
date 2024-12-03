import produce from 'immer';
import { Action } from '@root/store/checkpoints/actions';
import { ActionType } from '@root/store/checkpoints/actions-types';
import { RepositoriesStateResponse } from '../interfaces';

interface RepositoriesStateInterface {
    shiftCheckoutLoading: boolean;
    error: string | null;
    shiftCheckpointsData: RepositoriesStateResponse[];
    scannedCheckPointLoading: boolean;
}

const initialState = {
    shiftCheckoutLoading: false,
    error: null,
    shiftCheckpointsData: [],
    scannedCheckPointLoading: false,
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
            case ActionType.SHIFT_CHECKPOINTS_INIT:
                draft.shiftCheckoutLoading = true;
                draft.error = null;
                draft.shiftCheckpointsData = [];
                return draft;
            case ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS:
                draft.shiftCheckoutLoading = false;
                draft.error = null;
                draft.shiftCheckpointsData = action.payload;
                return draft;
            case ActionType.SHIFT_CHECKPOINTS_GET_FAILED:
                draft.shiftCheckoutLoading = false;
                draft.error = action.payload;
                draft.shiftCheckpointsData = [];
                return draft;

            case ActionType.SCANNED_CHECKPOINTS_INIT:
                draft.scannedCheckPointLoading = true;
                draft.error = null;
                draft.shiftCheckpointsData = [];
                return draft;
            case ActionType.SCANNED_CHECKPOINTS_GET_SUCCESS:
                draft.scannedCheckPointLoading = false;
                draft.error = null;
                return draft;
            case ActionType.SCANNED_CHECKPOINTS_GET_FAILED:
                draft.scannedCheckPointLoading = false;
                draft.error = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
