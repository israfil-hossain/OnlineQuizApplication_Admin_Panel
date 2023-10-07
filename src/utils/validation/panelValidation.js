import * as Yup from 'yup';

const panelValidationSchema = Yup.object({
    title: Yup.string().min(2).required("Title Name is required!"),
  });

export default panelValidationSchema;