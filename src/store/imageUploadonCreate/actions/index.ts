import { ActionType } from '@root/store/imageUploadonCreate/actions-types';

interface ImageUploadOnCreateInit {
    type: ActionType.ONCREATE_UPLOAD_INIT;
}

interface ImageUploadOnCreateSuccessAction {
    type: ActionType.ONCREATE_UPLOAD_GET_SUCCESS;
    payload: [];
}

interface ImageUploadOnCreateErrorAction {
    type: ActionType.ONCREATE_UPLOAD_GET_FAILED;
    payload: any;
}

interface ImageUploadOnCreateUpdateAction {
    type : ActionType.ONCREATE_UPLOAD_UPPDATE;
    payload:any
}

export type Action = ImageUploadOnCreateInit | ImageUploadOnCreateSuccessAction | ImageUploadOnCreateErrorAction | ImageUploadOnCreateUpdateAction;
