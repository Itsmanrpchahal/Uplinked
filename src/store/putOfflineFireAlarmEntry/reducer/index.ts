import produce from 'immer';
import { Action } from '@root/store/putOfflineFireAlarmEntry/actions';
import { ActionType_Offline_Fire_Alarm } from '@root/store/putOfflineFireAlarmEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlineFireAlarm: boolean;
    error: string | null;
    offlineFireAlarmListData: any;
    index: any;
}

const initialState = {
    loading_offlineFireAlarm: false,
    error: null,
    offlineFireAlarmListData: [],
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
            case ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_INIT:
                draft.loading_offlineFireAlarm = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_GET_SUCCESS:
                draft.loading_offlineFireAlarm = false;
                draft.error = null;
                draft.offlineFireAlarmListData.push(action.payload);
                return draft;
            case ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_GET_FAILED:
                draft.loading_offlineFireAlarm = false;
                draft.error = action.payload;
                draft.offlineFireAlarmListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
