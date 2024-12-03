import { Dispatch } from 'redux';
import { ActionType_Offline_Fire_Alarm } from '@root/store/putOfflineFireAlarmEntry/actions-types';
import { Action } from '@root/store/putOfflineFireAlarmEntry/actions';

/**
 * @param fn
 */
export const putOfflineFireAlarmEntry = (fn: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_INIT,
        });

        try {
            dispatch({
                type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_GET_SUCCESS,
                payload: fn,
            });

            return fn;
        } catch (e: any) {
            dispatch({
                type: ActionType_Offline_Fire_Alarm.OFFLINE_FIRE_ALARM_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
