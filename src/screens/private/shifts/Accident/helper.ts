import * as Yup from 'yup';

export const ACCIDENT_ENTRY_SCHEMA = Yup.object().shape({
    reportTime: Yup.string().required('Report Time is required'),
    description:Yup.string().required('Description is required'),
   

});



export const setAccidentStep = {
    
    reportTime :null,
    location:'',
    problemReporter:'',
    reportedDateTime:null,
    description:'',
    problemRectification:'',
    accidentDateTime:null,
    furtherAction:'',
    referredToManager:false,

    complainantName:'',
    complainantHomePhone:'',
    complainantWorkPhone:'',
    complainantEmployer:'',
    complainantMobile:'',
    complainantDOB:null,
    complainantAddress:'',

    offenderName:'',
    offenderHomePhone:'',
    offenderEmployer:'',
    offenderWorkPhone:'',
    offenderAddress:'',
    offenderMobile:'',
    offenderDOB:null,

    primaryWitnessName:'',
    primaryWitnessHomePhone:'',
    primaryWitnessEmployer:'',
    primaryWitnessWorkPhone:'',
    primaryWitnessAddress:'',
    primaryWitnessMobile:'',
    primaryWitnessDOB:null,

    secondaryWitnessName:'',
    secondaryWitnessHomePhone:'',
    secondaryWitnessEmployer:'',
    secondaryWitnessWorkPhone:'',
    secondaryWitnessAddress:'',
    secondaryWitnessMobile:'',
    secondaryWitnessDOB:null,

    policeOfficerName:'',
    policeOfficerStation:'',
    policeOfficerSection:''
}
