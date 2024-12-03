import produce from 'immer';
import { Action } from '@root/store/bomb-threat/actions';
import { ActionType } from '@root/store/bomb-threat/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    bombThreatData: any;
}

const initialState = {
    loading: false,
    error: null,
    bombThreatData: {},
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
            case ActionType.BOMB_THREAT_INIT:
                draft.loading = true;
                draft.error = null;
                draft.bombThreatData = {};

                return draft;
            case ActionType.BOMB_THREAT_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.bombThreatData = action.payload;

                return draft;
            case ActionType.BOMB_THREAT_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.bombThreatData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
