import produce from 'immer';
import { Action } from '@root/store/bomThreatMultiStep/actions';
import { ActionType } from '@root/store/bomThreatMultiStep/actions-types';
import { fn } from 'moment';

interface RepositoriesStateInterface {
    bombThreatmultiStepdata:any
}
const initialState = {
    
    bombThreatmultiStepdata :{
        reportTime :'',
        bombExplodeDateTime:'',
        bombPlacementDatetime:'',
        description:'',
        bombType:'',
        didYouPlaceTheBomb:false,
        bombPlacementReason:'',
        callerName:'',
        callerAddress:'',
        callerCurrentLocation:'',
    
        callerAccent:'',
        impediment:'',
        callerVoice:'',
        callerSpeech:'',
        callerDiction:'',
        callerManner:'',
        voiceRecognized:false,
        whoTheCallerWas:'',
        callerFamiliarWithArea:false,
    
        threatWording:'',
        reportCallTo:'',
        reportCallToPhone:'',
        callerEstimatedAge:0,
        callTime:'',
        callDuration:'',
        recipientName:'',
        recipientPhone:'',
        callerSex:''
    },
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
            case ActionType.BOMB_THREAT_MULTISTEP_INIT:
                return draft;
            case ActionType.BOMB_THREAT_MULTISTEP_GET_SUCCESS:
                draft.bombThreatmultiStepdata  = action.payload
               
                return draft;

            case ActionType.BOMB_THREAT_MULTISTEP_GET_FAILED:
                draft.bombThreatmultiStepdata  = action.payload
                
                return draft;
            default:

                return draft;
        }
    });

export default reducer;
