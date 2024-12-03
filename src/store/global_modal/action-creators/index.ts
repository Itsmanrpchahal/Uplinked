import { ActionType } from '@root/store/global_modal/actions-types';

/**
 * @param modalType
 * @param modalProps
 */
export const openModal = (modalType: string, modalProps: any) => {
    return {
        type: ActionType.MODAL_OPEN,
        payload: {
            modalType,
            modalProps,
        },
    };
};

/**
 * @description: GlobalModalClose
 */
export const closeModal = () => {
    return {
        type: ActionType.MODAL_CLOSE,
        payload: {
            modalType: null,
            modalProps: null,
        },
    };
};
