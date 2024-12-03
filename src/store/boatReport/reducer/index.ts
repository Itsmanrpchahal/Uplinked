import produce from 'immer';
import { Action } from '@root/store/boatReport/actions';
import { ActionType } from '@root/store/boatReport/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    boatReportData: any;
}

const initialState = {
    loading: false,
    error: null,
    boatReportData: {},
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
            case ActionType.BOAT_REPORT_INIT:
                draft.loading = true;
                draft.error = null;
                draft.boatReportData = {};

                return draft;
            case ActionType.BOAT_REPORT_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.boatReportData = action.payload;

                return draft;
            case ActionType.BOAT_REPORT_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.boatReportData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
