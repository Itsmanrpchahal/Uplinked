import produce from 'immer';
import { Action } from '@root/store/actions/actions';
import { ActionType } from '@root/store/actions/actions-types';
import { array } from 'yup';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    actionsData: any;
}

const initialState = {
    loading: false,
    error: null,
    actionsData: [],
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
            case ActionType.ACTIONS_INIT:
                draft.loading = true;
                draft.error = null;
                draft.actionsData = [];

                return draft;
            case ActionType.ACTIONS_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.actionsData = action.payload;

                return draft;
            case ActionType.ACTIONS_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.actionsData = [];

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
