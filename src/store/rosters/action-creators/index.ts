import {Dispatch} from 'redux';
import {ActionType} from '@root/store/rosters/actions-types';
import {Action} from '@root/store/rosters/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {RosterInterface, UpcomingRostersInterface} from '../interfaces';

/**
 * @param fn
 */
export const getRosters = (fn: RosterInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ROSTERS_INIT,
        });
        try {
            // // @ts-ignore
            const response = await service.get(fn.type === 'week' ? fn.uri :fn.uri+'?val='+fn.val ,)
            dispatch({
                type: ActionType.ROSTERS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ROSTERS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const getUpcomingRosters = (fn: UpcomingRostersInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPCOMING_ROSTERS_INIT,
        });
        try {
            const response = await service.get(apiUri.shifts.upcomingRosters, );
            dispatch({
                type: ActionType.UPCOMING_ROSTERS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.UPCOMING_ROSTERS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
