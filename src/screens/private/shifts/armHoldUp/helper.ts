import { useState } from 'react';
import * as Yup from 'yup';

export const ARM_HOLD_UP_1 = Yup.object().shape({
    reportTime: Yup.string().required('Report Time is required'),
    description: Yup.string().required('Description is required'),
});

export const ARM_HOLD_UP_3 = Yup.object().shape({
    description: Yup.string().required('Description is required'),
});



export const setArmStep1 = {
    reportTime: '',
    description:'',
    holdupDateTime: '',
    hat: '',
    hair: '',
    eyes: '',
    ears: '',
    nose: '',
    chin: '',
    complexion: '',
    shirt: '',
    tieOrScarf: '',
    coatOrJacket: '',
    gloves: '',
    pantsOrTrousers: '',
    socks: '',
    shoes: '',
    height: '',
    weight: '',
    handedDescription: '',
    physicalCharacteristicsDescription: '',
    weaponsAndEquipment: '',
    remarks: '',
    haveNote: false,
    noteDescription: '',
    influenceOfDrugsOrAlcohol: false,
    hasRobberTouchedAnything: false,
    touchDescription: '',
    haveDisguise: false,
    hasRobberUsedAContainer: false,
    hasLeftEvidence: false,
    evidenceDescription: '',
    containerDescription:'',
    influenceofDrugDescription:'',
    disguiseDescription:''

}
