import produce from 'immer';
import { Action } from '@root/store/intoxication/actions';
import { ActionType } from '@root/store/intoxication/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    intoxicationData: any;
}

const initialState = {
    loading: false,
    error: null,
    intoxicationData: {},
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
            case ActionType.INTOXICATION_INIT:
                draft.loading = true;
                draft.error = null;
                draft.intoxicationData = {};

                return draft;
            case ActionType.INTOXICATION_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.intoxicationData = action.payload;

                return draft;
            case ActionType.INTOXICATION_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.intoxicationData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
