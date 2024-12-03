import * as Yup from 'yup'
import signupFormModel from './signup-model'
const {
  formField: {
    reportTime,
    fireAlarmLocation,
    buildingNumber,
    description,
    causeOfAlarm,
    fireBrigadeDetails,
  },
} = signupFormModel

export default [
  Yup.object().shape({
    [reportTime.name]: Yup.string().required(`${reportTime.requiredErrorMsg}`),
    [fireAlarmLocation.name]: Yup.string().required(`${fireAlarmLocation.requiredErrorMsg}`),
    [buildingNumber.name]: Yup.string().required(`${buildingNumber.requiredErrorMsg}`),
    [description.name]: Yup.string().required(`${description.requiredErrorMsg}`),
    [causeOfAlarm.name]: Yup.string().required(`${causeOfAlarm.requiredErrorMsg}`)
  }),
  Yup.object().shape({
    [fireBrigadeDetails.name]: Yup.string().required(`${fireBrigadeDetails.requiredErrorMsg}`)
  }),
]
