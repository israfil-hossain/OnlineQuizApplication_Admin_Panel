import * as Yup from "yup";

const studyValidationSchema = Yup.object().shape({
 
  study_name : Yup.string().required("Study Name  is required"),
  study_title : Yup.string().required("Study Title is required"),


  
});

export default studyValidationSchema;
