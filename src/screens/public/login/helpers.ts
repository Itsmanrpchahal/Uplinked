import * as Yup from 'yup';

export const LOGIN_SCHEMA = Yup.object().shape({
    userName: Yup.string()
        .email('Email entered is not valid')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
    code:Yup.string().required('Org Code is required')
});
