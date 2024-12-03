import * as Yup from 'yup';

export const PATROL_ENTRY_SCHEMA = Yup.object().shape({
    description: Yup.string().required('Description is required'),
});
