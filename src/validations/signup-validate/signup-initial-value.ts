import signupFormModel from './signup-model'

const {
  formField: {
    reportTime,
    fireAlarmLocation,
    buildingNumber,
    notifiedByMonitoring,
    description,
    faultOnPanel,
    causeOfAlarm,
    fireBrigadeAttended,
    fireBrigadeDetails,
    isolatedByFireBrigade,
    serviceRequired,
    shiftID,
  },
} = signupFormModel

export default {
  [reportTime.name]: '',
  [fireAlarmLocation.name]: '',
  [buildingNumber.name]: '',
  [notifiedByMonitoring.name]: false,
  [description.name]: '',
  [faultOnPanel.name]: false,
  [causeOfAlarm.name]: '',
  [fireBrigadeAttended.name]: false,
  [fireBrigadeDetails.name]: '',
  [isolatedByFireBrigade.name]: false,
  [serviceRequired.name]: false,
  [shiftID.name]: '',
}
