import * as Yup from 'yup';

export const BOMBREPORT_ENTRY_SCHEMA_1 = Yup.object().shape({
    reportTime:Yup.string().required('Report Time is required'),
    description:Yup.string().required('Description is required'),
});
export const BOMBREPORT_ENTRY_SCHEMA_2 = Yup.object().shape({
    callerAccent:Yup.string().required('Caller Accent is required'),
    impediment:Yup.string().required('Impediment is required'),
});
export const BOMBREPORT_ENTRY_SCHEMA_3 = Yup.object().shape({
    callerEstimatedAge:Yup.string().required('Caller Estimated Age is required'),
    callTime:Yup.string().required('Call Time is required'),
   
});
