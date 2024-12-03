import produce from 'immer';
import { Action } from '@root/store/crowdCount/actions';
import { ActionType } from '@root/store/crowdCount/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    crowdCountData: any;
}

const initialState = {
    loading: false,
    error: null,
    crowdCountData: {},
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
            case ActionType.CROWD_COUNT_INIT:
                draft.loading = true;
                draft.error = null;
                draft.crowdCountData = {};

                return draft;
            case ActionType.CROWD_COUNT_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.crowdCountData = action.payload;

                return draft;
            case ActionType.CROWD_COUNT_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.crowdCountData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
