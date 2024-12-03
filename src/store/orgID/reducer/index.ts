import produce from 'immer';
import { Action } from '@root/store/orgID/actions';
import { ActionType } from '@root/store/orgID/actions-types';
import { array } from 'yup';

interface RepositoriesStateInterface {
    orgIdloading: boolean;
    error: string | null;
    orgIDData: any;
}

const initialState = {
    orgIdloading: false,
    error: null,
    orgIDData: {},
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
            case ActionType.ORGID_INIT:
                draft.orgIdloading = true;
                draft.error = null;
                draft.orgIDData = {};
                return draft;
            case ActionType.ORGID_GET_SUCCESS:
                draft.orgIdloading = false;
                draft.error = null;
                draft.orgIDData = action.payload;

                return draft;
            case ActionType.ORGID_GET_FAILED:
                draft.orgIdloading = false;
                draft.error = action.payload;
                draft.orgIDData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
