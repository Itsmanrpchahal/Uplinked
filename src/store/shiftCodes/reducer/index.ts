import produce from 'immer';
import { Action } from '@root/store/shiftCodes/actions';
import { ActionType } from '@root/store/shiftCodes/actions-types';

interface RepositoriesStateInterface {
    loading_shiftCode: boolean;
    error: string | null;
    codeListData: any;
}

const initialState = {
    loading_shiftCode: false,
    error: null,
    codeListData:{}
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
            case ActionType.SHIFT_CODE_INIT:
                draft.loading_shiftCode = true;
                draft.error = null;
                draft.codeListData = {}
                return draft;
            case ActionType.SHIFT_CODE_GET_SUCCESS:
                draft.loading_shiftCode = false;
                draft.error = null;
                draft.codeListData = action.payload
                return draft;
            case ActionType.SHIFT_CODE_GET_FAILED:
                draft.loading_shiftCode = false;
                draft.error = action.payload;
                draft.codeListData = {}
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
