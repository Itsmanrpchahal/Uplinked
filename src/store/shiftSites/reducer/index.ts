import produce from 'immer';
import { Action } from '@root/store/shiftSites/actions';
import { ActionType } from '@root/store/shiftSites/actions-types';

interface RepositoriesStateInterface {
    loading_shiftSite: boolean;
    error: string | null;
    siteListData: any;
}

const initialState = {
    loading_shiftSite: false,
    error: null,
    siteListData:[]
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
            case ActionType.SHIFT_SITE_INIT:
                draft.loading_shiftSite = true;
                draft.error = null;
                draft.siteListData = []
                return draft;
            case ActionType.SHIFT_SITE_GET_SUCCESS:
                draft.loading_shiftSite = false;
                draft.error = null;
                draft.siteListData = action.payload
                return draft;
            case ActionType.SHIFT_SITE_GET_FAILED:
                draft.loading_shiftSite = false;
                draft.error = action.payload;
                draft.siteListData = action.payload
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
