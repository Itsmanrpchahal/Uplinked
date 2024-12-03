import produce from 'immer';
import { Action } from '@root/store/putOfflineIntoxicationEntry/actions';
import { ActionType_Offline_Intoxication } from '@root/store/putOfflineIntoxicationEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlineIntoxication: boolean;
    error: string | null;
    offlineIntoxicationListData: any;
    index: any;
}

const initialState = {
    loading_offlineIntoxication: false,
    error: null,
    offlineIntoxicationListData: [],
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
            case ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_INIT:
                draft.loading_offlineIntoxication = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_GET_SUCCESS:
                draft.loading_offlineIntoxication = false;
                draft.error = null;
                draft.offlineIntoxicationListData.push(action.payload);
                return draft;
            case ActionType_Offline_Intoxication.OFFLINE_INTOXICATION_GET_FAILED:
                draft.loading_offlineIntoxication = false;
                draft.error = action.payload;
                draft.offlineIntoxicationListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
