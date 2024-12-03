import produce from 'immer';
import { Action } from '@root/store/messageFiles/actions';
import { ActionType } from '@root/store/messageFiles/actions-types';

interface RepositoriesStateInterface {
    messageLoading: boolean;
    error: string | null;
    messageFilesData: any;
}

const initialState = {
    messageLoading: false,
    error: null,
    messageFilesData: [],
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
            case ActionType.MESSAGE_FILES_INIT:
                draft.messageLoading = true;
                draft.error = null;
                draft.messageFilesData = [];
                return draft;
            case ActionType.MESSAGE_FILES_GET_SUCCESS:
                draft.messageLoading = false;
                draft.error = null;
                draft.messageFilesData = action.payload;
                return draft;
            case ActionType.MESSAGE_FILES_GET_FAILED:
                draft.messageLoading = false;
                draft.error = action.payload;
                draft.messageFilesData = [];
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
