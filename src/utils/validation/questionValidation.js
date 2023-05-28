import * as Yup from "yup";

const questionValidationSchema = Yup.object().shape({
 
  quizname : Yup.string().required("Quiz Name  is required"),
  question_name : Yup.string().required("Question Name is required"),
  options: Yup.array().of(
    Yup.object().shape({
      option_a: Yup.string().required('Option A is required'),
      option_b: Yup.string().required('Option B is required'),
      option_c: Yup.string().required('Option C is required'),
      option_d: Yup.string().required('Option D is required'),
      option_e: Yup.string().required('Option E is required'),
    })
  ),
  answer : Yup.string().required("Answer is required"),

  
});

export default questionValidationSchema;
