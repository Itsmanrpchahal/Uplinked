import produce from 'immer';
import { Action } from '@root/store/imageUploadonCreate/actions';
import { ActionType } from '@root/store/imageUploadonCreate/actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RepositoriesStateInterface {
    loading_imageOnCreate: boolean;
    error: string | null;
    imageOnCreateListData: any;
    index:any
}

const initialState = {
    loading_imageOnCreate: false,
    error: null,
    imageOnCreateListData:[],
    index : 0
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
            case ActionType.OFFILINE_QR_INIT:
                draft.loading_imageOnCreate = true;
                draft.error = null;
                return draft;
            case ActionType.OFFILINE_QR_GET_SUCCESS:
                draft.loading_imageOnCreate = false;
                draft.error = null;
                draft.imageOnCreateListData.push(action.payload)
                return draft;
            case ActionType.OFFILINE_QR_GET_FAILED:
                draft.loading_imageOnCreate = false;
                draft.error = action.payload;
                draft.imageOnCreateListData = []
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
