import produce from 'immer';
import { Action } from '@root/store/orgCode/actions';
import { ActionType } from '@root/store/orgCode/actions-types';
import { array } from 'yup';

interface RepositoriesStateInterface {
    orgCodeloading: boolean;
    error: string | null;
    orgCodeData: any;
}

const initialState = {
    orgCodeloading: false,
    error: null,
    orgCodeData: null,
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
            case ActionType.ORG_CODE_INIT:
                draft.orgCodeloading = true;
                draft.error = null;
                draft.orgCodeData = null;

                return draft;
            case ActionType.ORG_CODE_GET_SUCCESS:
                draft.orgCodeloading = false;
                draft.error = null;
                draft.orgCodeData = action.payload;
                
                return draft;
            case ActionType.ORG_CODE_GET_FAILED:
                draft.orgCodeloading = false;
                draft.error = action.payload;
                draft.orgCodeData = null;

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
