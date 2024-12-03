import produce from 'immer';
import { Action } from '@root/store/putOfflineCrowdCountEntry/actions';
import { ActionType_Offline_Crowd_Count } from '@root/store/putOfflineCrowdCountEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlineCrowdCount: boolean;
    error: string | null;
    offlineCrowdCountListData: any;
    index: any;
}

const initialState = {
    loading_offlineCrowdCount: false,
    error: null,
    offlineCrowdCountListData: [],
    index: 0,
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
            case ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_INIT:
                draft.loading_offlineCrowdCount = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_GET_SUCCESS:
                draft.loading_offlineCrowdCount = false;
                draft.error = null;
                draft.offlineCrowdCountListData.push(action.payload);
                return draft;
            case ActionType_Offline_Crowd_Count.OFFLINE_CROWD_COUNT_GET_FAILED:
                draft.loading_offlineCrowdCount = false;
                draft.error = action.payload;
                draft.offlineCrowdCountListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
