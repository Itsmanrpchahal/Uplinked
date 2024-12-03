import { Dispatch } from 'redux';
import { ActionType } from '@root/store/accidentMultiStep/actions-types';
import { Action } from '@root/store/accidentMultiStep/actions';
/**
 * @param fn
 */
export const setAccidentMultiStep = (data: any) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ACCIDENT_MULTISTEP_INIT,
        });
        const response = {
            reportTime: data.reportTime.toString(),
            description: data.description,
            location: data.location,
            problemReporter: data.problemReporter,
            accidentDateTime: data.accidentDateTime,
            problemRectification: data.problemRectification,
            reportedDateTime: data.reportedDateTime,
            furtherAction: data.furtherAction,
            referredToManager: data.referredToManager,
            complainantName: data.complainantName,
            complainantHomePhone: data.complainantHomePhone,
            complainantWorkPhone: data.complainantWorkPhone,
            complainantEmployer: data.complainantEmployer,
            complainantMobile: data.complainantMobile,
            complainantDOB: data.complainantDOB,
            complainantAddress: data.complainantAddress,
            offenderName: data.offenderName,
            offenderHomePhone: data.offenderHomePhone,
            offenderEmployer: data.offenderEmployer,
            offenderWorkPhone: data.offenderWorkPhone,
            offenderAddress: data.offenderAddress,
            offenderMobile: data.offenderMobile,
            offenderDOB: data.offenderDOB,
            primaryWitnessName: data.primaryWitnessName,
            primaryWitnessHomePhone: data.primaryWitnessHomePhone,
            primaryWitnessEmployer: data.primaryWitnessEmployer,
            primaryWitnessWorkPhone: data.primaryWitnessWorkPhone,
            primaryWitnessAddress: data.primaryWitnessAddress,
            primaryWitnessMobile: data.primaryWitnessMobile,
            primaryWitnessDOB: data.primaryWitnessDOB,
            secondaryWitnessName: data.secondaryWitnessName,
            secondaryWitnessHomePhone: data.secondaryWitnessHomePhone,
            secondaryWitnessEmployer: data.secondaryWitnessEmployer,
            secondaryWitnessWorkPhone: data.secondaryWitnessWorkPhone,
            secondaryWitnessAddress: data.secondaryWitnessAddress,
            secondaryWitnessMobile: data.secondaryWitnessMobile,
            secondaryWitnessDOB: data.secondaryWitnessDOB,
            policeOfficerName: data.policeOfficerName,
            policeOfficerStation: data.policeOfficerStation,
            policeOfficerSection: data.policeOfficerSection,
        }
        dispatch({
            type: ActionType.ACCIDENT_MULTISTEP_GET_SUCCESS,
            payload: response,
        });

        return response;

    };
};
