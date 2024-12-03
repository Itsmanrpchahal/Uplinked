import { Dispatch } from 'redux';
import { ActionType } from '@root/store/orgID/actions-types';
import { Action } from '@root/store/orgID/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service ,{setOrgID} from '@root/service/axios';

/**
 * @param fn
 */
export const getOrgID = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ORGID_INIT,
        });
        try {
            const response = await service.get(apiUri.auth.getOrgID,);
            setOrgID(response.data.orgs[0].orgID)
            
            dispatch({
                type: ActionType.ORGID_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ORGID_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
