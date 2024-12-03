import produce from 'immer';
import { Action } from '@root/store/putOfflineWelfareCheckEntry/actions';
import { ActionType_Offline_Welfare_Check } from '@root/store/putOfflineWelfareCheckEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlineWelfareCheck: boolean;
    error: string | null;
    offlineWelfareCheckListData: any;
    index: any;
}

const initialState = {
    loading_offlineWelfareCheck: false,
    error: null,
    offlineWelfareCheckListData: [],
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
            case ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_INIT:
                draft.loading_offlineWelfareCheck = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_GET_SUCCESS:
                draft.loading_offlineWelfareCheck = false;
                draft.error = null;
                draft.offlineWelfareCheckListData.push(action.payload);
                return draft;
            case ActionType_Offline_Welfare_Check.OFFLINE_WELFARE_CHECK_GET_FAILED:
                draft.loading_offlineWelfareCheck = false;
                draft.error = action.payload;
                draft.offlineWelfareCheckListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
