import produce from 'immer';
import { Action } from '@root/store/messageMarkRead/actions';
import { ActionType } from '@root/store/messageMarkRead/actions-types';

interface RepositoriesStateInterface {
    messageMarkLoading: boolean;
    error: string | null;
    messageMarkData: any;
}

const initialState = {
    messageMarkLoading: false,
    error: null,
    messageMarkData: [],
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
            case ActionType.MESSAGE_READ_INIT:
                draft.messageMarkLoading = true;
                draft.error = null;
                draft.messageMarkData = [];
                return draft;
            case ActionType.MESSAGE_READ_GET_SUCCESS:
                draft.messageMarkLoading = false;
                draft.error = null;
                draft.messageMarkData = action.payload;
                return draft;
            case ActionType.MESSAGE_READ_GET_FAILED:
                draft.messageMarkLoading = false;
                draft.error = action.payload;
                draft.messageMarkData = [];
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
