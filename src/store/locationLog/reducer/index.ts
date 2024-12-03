import produce from 'immer';
import { Action } from '@root/store/locationLog/actions';
import { ActionType } from '@root/store/locationLog/actions-types';

interface RepositoriesStateInterface {
    locationLogLoading: boolean;
    error: string | null;
    locationLogData: any;
}

const initialState = {
    locationLogLoading: false,
    error: null,
    locationLogData: null,
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
            case ActionType.LOCATION_LOG_INIT:
                draft.locationLogLoading = true;
                draft.error = null;
                draft.locationLogData = null;
                return draft;
            case ActionType.LOCATION_LOG_GET_SUCCESS:
                draft.locationLogLoading = false;
                draft.error = null;
                draft.locationLogData = action.payload;
                return draft;
            case ActionType.LOCATION_LOG_GET_FAILED:
                draft.locationLogData = false;
                draft.error = action.payload;
                draft.locationLogData = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
