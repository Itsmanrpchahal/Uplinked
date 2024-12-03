import produce from 'immer';
import { Action } from '@root/store/vehicle/actions';
import { ActionType } from '@root/store/vehicle/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    vehicleData: any;
}

const initialState = {
    loading: false,
    error: null,
    vehicleData: {},
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
            case ActionType.VEHICLE_INIT:
                draft.loading = true;
                draft.error = null;
                draft.vehicleData = {};

                return draft;
            case ActionType.VEHICLE_GET_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.vehicleData = action.payload;

                return draft;
            case ActionType.VEHICLE_GET_FAILED:
                draft.loading = false;
                draft.error = action.payload;
                draft.vehicleData = {};

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
