import produce from 'immer';
import { Action } from '@root/store/deleteEntry/actions';
import { ActionType } from '@root/store/deleteEntry/actions-types';

interface RepositoriesStateInterface {
    loading_delete_entry: boolean;
    error: string | null;
    
}

const initialState = {
    loading_delete_entry: false,
    error: null,
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
            case ActionType.DELETE_REPORT_INIT:
                draft.loading_delete_entry = true;
                draft.error = null;

                return draft;
            case ActionType.DELETE_REPORT_GET_SUCCESS:
                draft.loading_delete_entry = false;
                draft.error = null;

                return draft;
            case ActionType.DELETE_REPORT_GET_FAILED:
                draft.loading_delete_entry = false;
                draft.error = action.payload;

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
