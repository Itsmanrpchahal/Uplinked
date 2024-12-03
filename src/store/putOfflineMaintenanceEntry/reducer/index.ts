import produce from 'immer';
import { Action } from '@root/store/putOfflineMaintenanceEntry/actions';
import { ActionType_Offline_Maintenance } from '@root/store/putOfflineMaintenanceEntry/actions-types';

interface RepositoriesStateInterface {
    loading_offlineMaintenance: boolean;
    error: string | null;
    offlineMaintenanceListData: any;
    index: any;
}

const initialState = {
    loading_offlineMaintenance: false,
    error: null,
    offlineMaintenanceListData: [],
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
            case ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_INIT:
                draft.loading_offlineMaintenance = true;
                draft.error = null;
                return draft;
            case ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_GET_SUCCESS:
                draft.loading_offlineMaintenance = false;
                draft.error = null;
                draft.offlineMaintenanceListData.push(action.payload);
                return draft;
            case ActionType_Offline_Maintenance.OFFLINE_MAINTENANCE_GET_FAILED:
                draft.loading_offlineMaintenance = false;
                draft.error = action.payload;
                draft.offlineMaintenanceListData = [];
                return draft;

            default:
                return draft;
        }
    });

export default reducer;
