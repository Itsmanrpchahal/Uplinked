import { Dispatch } from 'redux';
import { ActionType } from '@root/store/messageMarkRead/actions-types';
import { Action } from '@root/store/messageMarkRead/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const setMessageRead = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MESSAGE_READ_INIT,
        });
        try {
             
            const response = await service.put(apiUri.message.messageMarkRead+data.id);
            dispatch({
                type: ActionType.MESSAGE_READ_GET_SUCCESS,
                payload: response.data,
            });


            return response;
        } catch (e: any) {
            
            dispatch({
                type: ActionType.MESSAGE_READ_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
 export const deleteMessageFiles = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MESSAGE_FILES_INIT,
        });
        try {
            
            const response = await service.delete(apiUri.message.messageFileDelete+data.id);
            dispatch({
                type: ActionType.MESSAGE_FILES_GET_SUCCESS,
                payload: response.data,
            });


            return response;
        } catch (e: any) {
            
            dispatch({
                type: ActionType.MESSAGE_FILES_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
