import produce from 'immer';
import { Action } from '@root/store/accident/actions';
import { ActionType } from '@root/store/accident/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    accidentData: any;
}

const initialState = {
    loading: false,
    error: null,
    accidentData: {},
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
            case ActionType.ACCIDENT_INIT:
                draft.loading = true;
                draft.error = null;
                draft.accidentData = {};

                return draft;
            case ActionType.ACCIDENT_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.accidentData = action.payload;

                return draft;
            case ActionType.ACCIDENT_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.accidentData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
