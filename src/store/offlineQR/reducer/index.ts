import produce from 'immer';
import { Action } from '@root/store/offlineQR/actions';
import { ActionType_OfflineQR } from '@root/store/offlineQR/actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RepositoriesStateInterface {
    loading_offline: boolean;
    error: string | null;
    offlineListData: any;
    index: any;
}

const initialState = {
    loading_offline: false,
    error: null,
    offlineListData: [],
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
            case ActionType_OfflineQR.OFFILINE_QR_INIT:
                draft.loading_offline = true;
                draft.error = null;
                return draft;
            case ActionType_OfflineQR.OFFILINE_QR_GET_SUCCESS:
                draft.loading_offline = false;
                draft.error = null;
                draft.offlineListData.push(action.payload);
                return draft;
            case ActionType_OfflineQR.OFFILINE_QR_GET_FAILED:
                draft.loading_offline = false;
                draft.error = action.payload;
                draft.offlineListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
