import { Dispatch } from 'redux';
import { ActionType } from '@root/store/messageFiles/actions-types';
import { Action } from '@root/store/messageFiles/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getMessageFiles = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.MESSAGE_FILES_INIT,
        });
        try {
            
            const response = await service.get(apiUri.message.messageFiles+data.id);
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
