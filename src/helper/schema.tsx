import * as yup from 'yup';
export const schemaGeneral = yup
  .object({
    customerId: yup.number().required(),
    name: yup.string().required(),
    code: yup.string().required(),
    timeStart: yup.string().required().default(''),
    timeEnd: yup.string().required().default(''),
    note: yup.string().default(''),
    status: yup.boolean().default(false),
    projectType: yup.number().required()
  })
  .required();

export const schemaNotification = yup
  .object({
    komuChannelId: yup.string().required(),
    isNoticeKMSubmitTS: yup.boolean().default(false),
    isNoticeKMRequestOffDate: yup.boolean().default(false),
    isNoticeKMApproveRequestOffDate: yup.boolean().default(false),
    isNoticeKMRequestChangeWorkingTime: yup.boolean().default(false),
    isNoticeKMApproveChangeWorkingTime: yup.boolean().default(false)
  })
  .required();
