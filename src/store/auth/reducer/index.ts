import produce from 'immer';
import { Action } from '@root/store/auth/actions';
import { ActionType } from '@root/store/auth/actions-types';
import { getData } from 'storage';
import { DRAFT_STATE } from 'immer/dist/internal';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    accessToken: string;
    userName: string;
    refreshToken: string;
    isAuthenticated: boolean;
    orgID: number;
}

const initialState = {
    loading: false,
    error: null,
    accessToken: '',
    userName: '',
    refreshToken: '',
    isAuthenticated: false,
    orgID: 1,
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
            case ActionType.LOGIN:
                draft = {...draft, ...{loading:true}}
                return draft;
            case ActionType.LOGIN_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.accessToken = action.payload.accessToken;
                draft.userName = action.payload.userName;
                draft.refreshToken = action.payload.refreshToken;
                draft.isAuthenticated = false;
                return draft;
            case ActionType.LOGIN_ERROR:
                draft.loading = false;
                draft.error = action.payload;
                draft.accessToken = '';
                draft.userName = '';
                draft.refreshToken = '';
                draft.isAuthenticated = false;
                return draft;

            case ActionType.SET_AUTHENTICATION:
                draft.loading = false;
                draft.isAuthenticated = action.payload;
                return draft;

            case ActionType.SET_ORG_ID:
                draft.loading = false;
                draft.orgID = action.payload;
                draft.isAuthenticated = true;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
