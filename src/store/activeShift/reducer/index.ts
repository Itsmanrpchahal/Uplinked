import produce from 'immer';
import { Action } from '@root/store/activeShift/actions';
import { ActionType } from '@root/store/activeShift/actions-types';

interface RepositoriesStateInterface {
    activeLoading: boolean;
    error: string | null;
    activeShift: any;
    isActiveShift: boolean;
}

const initialState = {
    activeLoading: false,
    error: null,
    isActiveShift: false,
    activeShift: null,
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
            case ActionType.ACTIVE_SHIFT_INIT:
                draft.activeLoading = true;
                draft.error = null;
                draft.isActiveShift = false;
                draft.activeShift = null;
                return draft;
            case ActionType.ACTIVE_SHIFT_GET_SUCCESS:
                draft.activeLoading = false;
                draft.error = null;
                draft.isActiveShift =
                    Object.keys(action.payload).length > 0 ? true : false;
                draft.activeShift = action.payload;
                return draft;
            case ActionType.ACTIVE_SHIFT_GET_FAILED:
                draft.activeLoading = false;
                draft.error = action.payload;
                draft.isActiveShift = false;
                draft.activeShift = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
