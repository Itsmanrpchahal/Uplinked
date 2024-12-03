import produce from 'immer';
import { Action } from '@root/store/messageList/actions';
import { ActionType } from '@root/store/messageList/actions-types';

interface RepositoriesStateInterface {
    messageLoading: boolean;
    error: string | null;
    messageListData: any;
}

const initialState = {
    messageLoading: false,
    error: null,
    messageListData: [],
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
            case ActionType.MESSAGE_LIST_INIT:
                draft.messageLoading = true;
                draft.error = null;
                draft.messageListData = [];
                return draft;
            case ActionType.MESSAGE_LIST_GET_SUCCESS:
                draft.messageLoading = false;
                draft.error = null;
                draft.messageListData = action.payload;
                return draft;
            case ActionType.MESSAGE_LIST_GET_FAILED:
                draft.messageLoading = false;
                draft.error = action.payload;
                draft.messageListData = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
