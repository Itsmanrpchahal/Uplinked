import produce from 'immer';
import { Action } from '@root/store/fireAlarm/actions';
import { ActionType } from '@root/store/fireAlarm/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    fireAlarmData: any;
}

const initialState = {
    loading: false,
    error: null,
    fireAlarmData: {},
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
            case ActionType.FIREALARM_INIT:
                draft.loading = true;
                draft.error = null;
                draft.fireAlarmData = {};

                return draft;
            case ActionType.FIREALARM_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.fireAlarmData = action.payload;

                return draft;
            case ActionType.FIREALARM_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.fireAlarmData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
