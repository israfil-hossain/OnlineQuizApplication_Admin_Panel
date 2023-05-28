import { API, FAPI } from "../config/axiosConfig";

const addQuestion = (values) => {
  return FAPI.post("/questions/add", values);
};
const getQuestion = () => {
  return API.get("/questions");
};

const getSingleQuestion = (id) => {
  return API.get(`/quiz/${id}`);
};

const updateQuestion = (id, values) => {
  return FAPI.put(`/questions/update/${id}`, values);
};
const deleteQuestion = (id) => {
  return API.delete(`/questions/delete/${id}`);
};

const getAllResult = () =>{
  return API.get("/result");
}

const getResultbyId = (id) =>{
  return API.get(`/result/singleresult/${id}`);
}

const QuestionService = {
  getQuestion,
  addQuestion,
  updateQuestion,
  getSingleQuestion,
  deleteQuestion,
  getAllResult,
  getResultbyId

};

export default QuestionService;
