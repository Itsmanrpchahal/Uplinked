import produce from 'immer';
import { Action } from '@root/store/welfare/actions';
import { ActionType } from '@root/store/welfare/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    welfareData: any;
}

const initialState = {
    loading: false,
    error: null,
    welfareData: {},
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
            case ActionType.WELFARE_INIT:
                draft.loading = true;
                draft.error = null;
                draft.welfareData = {};

                return draft;
            case ActionType.WELFARE_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.welfareData = action.payload;

                return draft;
            case ActionType.WELFARE_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.welfareData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
