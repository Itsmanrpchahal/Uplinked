import * as Yup from 'yup';

export const WELFARECHECK_ENTRY_SCHEMA = Yup.object().shape({
    reportTime: Yup.string().required('Report Time is required'),
    description:Yup.string().required('Description is required'),
   
});
