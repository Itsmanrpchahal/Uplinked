import produce from 'immer';
import { Action } from '@root/store/maintenanceType/actions';
import { ActionType } from '@root/store/maintenanceType/actions-types';

interface RepositoriesStateInterface {
    maintainenaceLoading: boolean;
    error: string | null;
    maintainenacelistData: any;
}

const initialState = {
    maintainenaceLoading: false,
    error: null,
    maintainenacelistData: null,
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
            case ActionType.MAINTENANCE_TYPE_INIT:
                draft.maintainenaceLoading = true;
                draft.error = null;
                draft.maintainenacelistData = null;
                return draft;
            case ActionType.MAINTENANCE_TYPE_GET_SUCCESS:
                draft.maintainenaceLoading = false;
                draft.error = null;
                draft.maintainenacelistData = action.payload;
                return draft;
            case ActionType.MAINTENANCE_TYPE_GET_FAILED:
                draft.maintainenaceLoading = false;
                draft.error = action.payload;
                draft.maintainenacelistData = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
