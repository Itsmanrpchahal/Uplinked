import produce from 'immer';
import { Action } from '@root/store/accidentMultiStep/actions';
import { ActionType } from '@root/store/accidentMultiStep/actions-types';

interface RepositoriesStateInterface {
    accidentmultiStepdata: any
}
const initialState = {
    accidentmultiStepdata: {
        reportTime: '',
            description: '',
            location: '',
            problemReporter: '',
            accidentDateTime: null,
            problemRectification: '',
            reportedDateTime: null,
            furtherAction: '',
            referredToManager: false,
            complainantName: '',
            complainantHomePhone: '',
            complainantWorkPhone: '',
            complainantEmployer: '',
            complainantMobile: '',
            complainantDOB: null,
            complainantAddress: '',
            offenderName: '',
            offenderHomePhone: '',
            offenderEmployer: '',
            offenderWorkPhone: '',
            offenderAddress: '',
            offenderMobile: '',
            offenderDOB: null,
            primaryWitnessName: '',
            primaryWitnessHomePhone: '',
            primaryWitnessEmployer: '',
            primaryWitnessWorkPhone: '',
            primaryWitnessAddress: '',
            primaryWitnessMobile: '',
            primaryWitnessDOB: null,
            secondaryWitnessName: '',
            secondaryWitnessHomePhone: '',
            secondaryWitnessEmployer: '',
            secondaryWitnessWorkPhone: '',
            secondaryWitnessAddress: '',
            secondaryWitnessMobile: '',
            secondaryWitnessDOB: null,
            policeOfficerName: '',
            policeOfficerStation: '',
            policeOfficerSection: '',
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
            case ActionType.ACCIDENT_MULTISTEP_INIT:
                return draft;
            case ActionType.ACCIDENT_MULTISTEP_GET_SUCCESS:
                draft.accidentmultiStepdata = action.payload

                return draft;

            case ActionType.ACCIDENT_MULTISTEP_GET_FAILED:
                draft.accidentmultiStepdata = action.payload

                return draft;
            default:

                return draft;
        }
    });

export default reducer;
