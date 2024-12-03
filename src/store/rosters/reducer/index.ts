import produce from 'immer';
import { Action } from '@root/store/rosters/actions';
import { ActionType } from '@root/store/rosters/actions-types';

interface RepositoriesStateInterface {
    roasterLoading: boolean;
    error: string | null;
    rosterData: any;
    upcomingRoasterLoading: boolean;
    upcomingRosterData: any;
}

const initialState = {
    roasterLoading: false,
    error: null,
    rosterData: [],
    upcomingRoasterLoading: false,
    upcomingRosterData: [],
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
            case ActionType.ROSTERS_INIT:
                draft.roasterLoading = true;
                draft.error = null;
                draft.rosterData = [];

                return draft;
            case ActionType.ROSTERS_GET_SUCCESS:
                draft.roasterLoading = false;
                draft.error = null;
                draft.rosterData = action.payload;

                return draft;
            case ActionType.ROSTERS_GET_FAILED:
                draft.roasterLoading = false;
                draft.error = action.payload;
                draft.rosterData = [];

                return draft;

            case ActionType.UPCOMING_ROSTERS_INIT:
                draft.upcomingRoasterLoading = true;
                draft.error = null;
                draft.upcomingRosterData = [];

                return draft;
            case ActionType.UPCOMING_ROSTERS_GET_SUCCESS:
                draft.upcomingRoasterLoading = false;
                draft.error = null;
                draft.upcomingRosterData = action.payload;

                return draft;
            case ActionType.UPCOMING_ROSTERS_GET_FAILED:
                draft.upcomingRoasterLoading = false;
                draft.error = action.payload;
                draft.upcomingRosterData = [];

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
