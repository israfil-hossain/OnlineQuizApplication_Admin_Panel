import * as Yup from 'yup';

const quizValidationSchema = Yup.object({
    category: Yup.string().min(2).required("Category Name is required"),
    quiz_name : Yup.string().min(3).required("Quiz Name is required")
  });

export default quizValidationSchema;