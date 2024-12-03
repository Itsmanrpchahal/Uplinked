import { Dispatch } from 'redux';
import { ActionType } from '@root/store/armholdUpMultiStep/actions-types';
import { Action } from '@root/store/armholdUpMultiStep/actions';
/**
 * @param fn
 */
export const setArmedMultiStep = (data: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ARMED_MULTISTEP_INIT,
        });
        const response = {
            reportTime: data.reportTime,
            description:data.description,
            holdupDateTime: data.holdupDateTime,
            hat: data.hat,
            hair: data.hair,
            eyes: data.eyes,
            ears: data.ears,
            nose: data.nose,
            chin: data.chin,
            complexion: data.complexion,
            shirt: data.shirt,
            tieOrScarf: data.tieOrScarf,
            coatOrJacket: data.coatOrJacket,
            gloves: data.gloves,
            pantsOrTrousers: data.pantsOrTrousers,
            socks: data.socks,
            shoes: data.shoes,
            height: data.height,
            weight: data.weight,
            handedDescription: data.handedDescription,
            physicalCharacteristicsDescription: data.physicalCharacteristicsDescription,
            weaponsAndEquipment: data.weaponsAndEquipment,
            remarks: data.remarks,
            haveNote: data.haveNote,
            noteDescription: data.noteDescription,
            influenceOfDrugsOrAlcohol: data.influenceOfDrugsOrAlcohol,
            hasRobberTouchedAnything: data.hasRobberTouchedAnything,
            touchDescription: data.touchDescription,
            haveDisguise: data.haveDisguise,
            hasRobberUsedAContainer: data.hasRobberUsedAContainer,
            hasLeftEvidence: data.hasLeftEvidence,
            evidenceDescription: data.evidenceDescription,
            containerDescription: data.containerDescription,
            influenceofDrugDescription: data.influenceofDrugDescription,
            disguiseDescription: data.disguiseDescription,
            robberLeave: data.robberLeave,
            motorVehicle: data.motorVehicle,
            make: data.make,
            model: data.model,
            color: data.color,
            distinguishingMarks: data.distinguishingMarks,
            licenseNumber: data.licenseNumber,
        }
        dispatch({
            type: ActionType.ARMED_MULTISTEP_GET_SUCCESS,
            payload: response,
        });

        return response;

    };
};
