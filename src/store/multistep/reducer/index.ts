import produce from 'immer';
import { Action } from '@root/store/multistep/actions';
import { ActionType_Multi_Step } from '@root/store/multistep/actions-types';
import { fn } from 'moment';

interface RepositoriesStateInterface {
    multiStepdata: any;
    multiStepLoading: boolean;
}
const initialState = {
    multiStepdata: {
        reportTime: '',
        fireAlarmLocation: '',
        buildingNumber: '',
        description: '',
        causeOfAlarm: '',
        notifiedByMonitoring: false,
        faultOnPanel: false,
        fireBrigadeDetails: '',
        fireBrigadeAttended: false,
        isolatedByFireBrigade: false,
        serviceRequired: false,
    },
    multiStepLoading: false,
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
            case ActionType_Multi_Step.MULTISTEP_INIT:
                // @ts-ignore
                draft.multiStepdata = initialState;
                draft.multiStepLoading = true;
                return draft;
            case ActionType_Multi_Step.MULTISTEP_GET_SUCCESS:
                draft.multiStepdata = action.payload;
                draft.multiStepLoading = false;
                return draft;

            case ActionType_Multi_Step.MULTISTEP_GET_FAILED:
                draft.multiStepdata = action.payload;
                draft.multiStepLoading = false;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
