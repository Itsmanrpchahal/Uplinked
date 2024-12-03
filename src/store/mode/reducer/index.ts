import produce from 'immer';
import { Action } from '@root/store/mode/actions';
import { ActionType } from '@root/store/mode/actions-types';
import {Appearance} from "react-native";
import {useState} from "react";

interface RepositoriesStateInterface {
    modeState :any;
}
var mode = Appearance.getColorScheme()
var modeState = mode === 'light' ? false : true
const initialState = {
 modeState:true                
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
            case ActionType.MODE_INIT:

                // @ts-ignore
                draft.modeState = action.payload
                return draft;
            case ActionType.MODE_GET_SUCCESS:
                draft.modeState = action.payload
                return draft;

            case ActionType.MODE_GET_FAILED:
                draft.modeState = state.modeState
                return draft;
            default:

                return draft;
        }
    });

export default reducer;
