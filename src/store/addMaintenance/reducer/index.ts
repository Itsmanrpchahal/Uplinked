import produce from 'immer';
import { Action } from '@root/store/addMaintenance/actions';
import { ActionType } from '@root/store/addMaintenance/actions-types';

interface RepositoriesStateInterface {
    addMaintainenaceLoading: boolean;
    error: string | null;
    addMaintainenaceData: any;
}

const initialState = {
    addMaintainenaceLoading: false,
    error: null,
    addMaintainenaceData: null,
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
            case ActionType.ADD_MAINTENANCE_INIT:
                draft.addMaintainenaceLoading = true;
                draft.error = null;
                draft.addMaintainenaceData = null;
                return draft;
            case ActionType.ADD_MAINTENANCE_GET_SUCCESS:
                draft.addMaintainenaceLoading = false;
                draft.error = null;
                draft.addMaintainenaceData = action.payload;
                return draft;
            case ActionType.ADD_MAINTENANCE_GET_FAILED:
                draft.addMaintainenaceLoading = false;
                draft.error = action.payload;
                draft.addMaintainenaceData = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
