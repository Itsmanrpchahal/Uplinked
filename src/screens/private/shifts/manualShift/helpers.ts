import * as Yup from 'yup';

export const MANUAL_SHIFT_SCHEMA = Yup.object().shape({
    description: Yup.string().required('Description is required'),
});


export const SHIFTOCDE_ENTRY_SCHEMA = Yup.object().shape({
    shiftcode: Yup.string().required('Shift code is required'),
});
