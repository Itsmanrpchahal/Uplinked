import produce from 'immer';
import { Action } from '@root/store/putOfflinePatrolEntry/actions';
import { ActionType_Offline_Patrol } from '@root/store/putOfflinePatrolEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlinePatrol: boolean;
    error: string | null;
    offlinePatrolListData: any;
    index: any;
}

const initialState = {
    loading_offlinePatrol: false,
    error: null,
    offlinePatrolListData: [],
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
            case ActionType_Offline_Patrol.OFFLINE_PATROL_INIT:
                draft.loading_offlinePatrol = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Patrol.OFFLINE_PATROL_GET_SUCCESS:
                draft.loading_offlinePatrol = false;
                draft.error = null;
                draft.offlinePatrolListData.push(action.payload);
                return draft;
            case ActionType_Offline_Patrol.OFFLINE_PATROL_GET_FAILED:
                draft.loading_offlinePatrol = false;
                draft.error = action.payload;
                draft.offlinePatrolListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
