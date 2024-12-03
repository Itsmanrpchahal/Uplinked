import produce from 'immer';
import { Action } from '@root/store/log/actions';
import { ActionType } from '@root/store/log/actions-types';

interface RepositoriesStateInterface {
    logLoading: boolean;
    error: string | null;
}

const initialState = {
    logLoading: false,
    error: null
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
            case ActionType.LOG_INIT:
                draft.logLoading = true;
                return draft;
            case ActionType.LOG_GET_SUCCESS:
                draft.logLoading = false;
                draft.error = action.payload
                return draft;
            case ActionType.LOG_GET_FAILED:
                draft.logLoading = false;
                draft.error = action.payload
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
