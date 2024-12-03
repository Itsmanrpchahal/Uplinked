import { Dispatch } from 'redux';
import { ActionType } from '@root/store/messageList/actions-types';
import { Action } from '@root/store/messageList/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getMessageList = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MESSAGE_LIST_INIT,
        });
        try {
            
            const response = await service.get(apiUri.message.messageList+'page='+data.page+'&rows='+data.rows,);
            dispatch({
                type: ActionType.MESSAGE_LIST_GET_SUCCESS,
                payload: response.data,
            });


            return response;
        } catch (e: any) {
            
            dispatch({
                type: ActionType.MESSAGE_LIST_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
