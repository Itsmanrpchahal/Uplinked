import { Dispatch } from 'redux';
import { ActionType_Multi_Step } from '@root/store/multistep/actions-types';
import { Action } from '@root/store/multistep/actions';
import { MultiInterface } from '../interfaces';
/**
 * @param fn
 */
export const setMultiStep = (type: string, data: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType_Multi_Step.MULTISTEP_INIT,
        });
        const response =
            type === 'Fire Alarm'
                ? {
                      type: 'Fire Alarm',
                      reportTime: data.reportTime,
                      fireAlarmLocation: data.fireAlarmLocation,
                      buildingNumber: data.buildingNumber,
                      description: data.description,
                      causeOfAlarm: data.causeOfAlarm,
                      notifiedByMonitoring: data.notifiedByMonitoring,
                      faultOnPanel: data.faultOnPanel,
                      fireBrigadeDetails: data.fireBrigadeDetails,
                      fireBrigadeAttended: data.fireBrigadeAttended,
                      isolatedByFireBrigade: data.isolatedByFireBrigade,
                      serviceRequired: data.serviceRequired,
                  }
                : 'Test New';
        dispatch({
            type: ActionType_Multi_Step.MULTISTEP_GET_SUCCESS,
            payload: response,
        });

        return response;
    };
};
