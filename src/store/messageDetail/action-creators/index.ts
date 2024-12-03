import { Dispatch } from 'redux';
import { ActionType } from '@root/store/messageDetail/actions-types';
import { Action } from '@root/store/messageDetail/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getMessageDetail = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MESSAGE_DETAIL_INIT,
        });
        try {
            
            const response = await service.get(apiUri.message.messageDetail+data.id);
            dispatch({
                type: ActionType.MESSAGE_DETAIL_GET_SUCCESS,
                payload: response.data,
            });


            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.MESSAGE_DETAIL_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
