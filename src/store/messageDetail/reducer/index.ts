import produce from 'immer';
import { Action } from '@root/store/messageDetail/actions';
import { ActionType } from '@root/store/messageDetail/actions-types';

interface RepositoriesStateInterface {
    messageLoading: boolean;
    error: string | null;
    messageDetailData: any;
}

const initialState = {
    messageLoading: false,
    error: null,
    messageDetailData: null,
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
            case ActionType.MESSAGE_DETAIL_INIT:
                draft.messageLoading = true;
                draft.error = null;
                draft.messageDetailData = null;
                return draft;
            case ActionType.MESSAGE_DETAIL_GET_SUCCESS:
                draft.messageLoading = false;
                draft.error = null;
                draft.messageDetailData = action.payload;
                return draft;
            case ActionType.MESSAGE_DETAIL_GET_FAILED:
                draft.messageLoading = false;
                draft.error = action.payload;
                draft.messageDetailData = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
