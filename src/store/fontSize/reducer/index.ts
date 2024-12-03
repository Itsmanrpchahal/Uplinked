import produce from 'immer';
import { Action } from '@root/store/fontSize/actions';
import { ActionType } from '@root/store/fontSize/actions-types';
import {Appearance} from "react-native";
import {useState} from "react";

interface RepositoriesStateInterface {
    fontSizeState :any;
}
const initialState = {
    fontSizeState:1
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
            case ActionType.FONTSIZE_INIT:

                // @ts-ignore
                draft.fontSizeState = action.payload
                return draft;
            case ActionType.FONTSIZE_GET_SUCCESS:
                draft.fontSizeState = action.payload
                return draft;

            case ActionType.FONTSIZE_GET_FAILED:
                draft.fontSizeState = state.fontSizeState
                return draft;
            default:

                return draft;
        }
    });

export default reducer;
