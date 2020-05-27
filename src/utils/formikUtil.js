import * as yup from 'yup';

export const commentSchema = yup.object({
  names: yup.string().required(),
  email: yup.string().required(),
  website: yup.string(),
  content: yup.string().required(),
});
export const commentInitialValues = {
  names: '',
  email: '',
  website: '',
  content: '',
};
