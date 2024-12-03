import { Dispatch } from 'redux';
import { ActionType } from '@root/store/bomThreatMultiStep/actions-types';
import { Action } from '@root/store/bomThreatMultiStep/actions';
import {MultiInterface} from "../interfaces";
/**
 * @param fn
 */
export const setBombThreatMultiStep = (data:any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BOMB_THREAT_MULTISTEP_INIT,
        });
            const response  = {
                reportTime :data.reportTime,
                bombExplodeDateTime:data.bombExplodeDateTime,
                bombPlacementDatetime:data.bombPlacementDatetime,
                description:data.description,
                bombType:data.bombType,
                didYouPlaceTheBomb:data.didYouPlaceTheBomb,
                bombPlacementReason:data.bombPlacementReason,
                callerName:data.callerName,
                callerAddress:data.callerAddress,
                callerCurrentLocation:data.callerCurrentLocation,
            
                callerAccent:data.callerAccent,
                impediment:data.impediment,
                callerVoice:data.callerVoice,
                callerSpeech:data.callerSpeech,
                callerDiction:data.callerDiction,
                callerManner:data.callerManner,
                voiceRecognized:data.voiceRecognized,
                whoTheCallerWas:data.whoTheCallerWas,
                callerFamiliarWithArea:data.callerFamiliarWithArea,
            
                threatWording:data.threatWording,
                reportCallTo:data.reportCallTo,
                reportCallToPhone:data.reportCallToPhone,
                callerEstimatedAge:data.callerEstimatedAge,
                callTime:data.callTime,
                callDuration:data.callDuration,
                recipientName:data.recipientName,
                recipientPhone:data.recipientPhone,
                callerSex:data.callerSex,
            } 
            dispatch({
                type: ActionType.BOMB_THREAT_MULTISTEP_GET_SUCCESS,
                payload: response,
            });

            return response;

    };
};
