import produce from 'immer';
import { Action } from '@root/store/global_modal/actions';
import { ActionType } from '@root/store/global_modal/actions-types';

interface RepositoriesStateInterface {
    modalType: string | null;
    modalProps: any;
}

const initialState = {
    modalType: null,
    modalProps: null,
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
            case ActionType.MODAL_OPEN:
                draft.modalType = action.payload.modalType;
                draft.modalProps = action.payload.modalProps;
                return draft;
            case ActionType.MODAL_CLOSE:
                draft.modalType = action.payload.modalType;
                draft.modalProps = action.payload.modalProps;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
