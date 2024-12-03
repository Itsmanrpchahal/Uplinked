import { useState } from 'react';
import * as Yup from 'yup';

export const FIREALARM_ENTRY_SCHEMA = Yup.object().shape({
    reportTime: Yup.string().required('Report Time is required'),
    
    description:Yup.string().required('Description is required'),
    
});

export const FIREALARM_ENTRY_SCHEMA_1 = Yup.object().shape({
    
})

