import produce from 'immer';
import { Action } from '@root/store/armHoldUp/actions';
import { ActionType } from '@root/store/armHoldUp/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    armHoldUpData: any;
}

const initialState = {
    loading: false,
    error: null,
    armHoldUpData: {},
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
            case ActionType.ARMED_HOLDUP_INIT:
                draft.loading = true;
                draft.error = null;
                draft.armHoldUpData = {};

                return draft;
            case ActionType.ARMED_HOLDUP_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.armHoldUpData = action.payload;

                return draft;
            case ActionType.ARMED_HOLDUP_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.armHoldUpData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
