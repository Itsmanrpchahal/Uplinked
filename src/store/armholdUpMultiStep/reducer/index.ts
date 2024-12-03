import produce from 'immer';
import { Action } from '@root/store/armholdUpMultiStep/actions';
import { ActionType } from '@root/store/armholdUpMultiStep/actions-types';

interface RepositoriesStateInterface {
    armedmultiStepdata: any
}
const initialState = {

    armedmultiStepdata: {
        reportTime: '',
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
        description: '',
        influenceOfDrugsOrAlcohol: false,
        hasRobberTouchedAnything: false,
        touchDescription: '',
        haveDisguise: false,
        hasRobberUsedAContainer: false,
        hasLeftEvidence: false,
        evidenceDescription: '',
        containerDescription: '',
        influenceofDrugDescription: '',
        disguiseDescription: '',
        robberLeave: '',
        motorVehicle:'',
        make: '',
        model: '',
        color: '',
        distinguishingMarks: '',
        licenseNumber: '',

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
            case ActionType.ARMED_MULTISTEP_INIT:
                return draft;
            case ActionType.ARMED_MULTISTEP_GET_SUCCESS:
                draft.armedmultiStepdata = action.payload

                return draft;

            case ActionType.ARMED_MULTISTEP_GET_FAILED:
                draft.armedmultiStepdata = action.payload

                return draft;
            default:

                return draft;
        }
    });

export default reducer;
