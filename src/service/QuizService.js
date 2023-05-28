import { API, FAPI } from "../config/axiosConfig";

const addQuiz = (values) => {
  return FAPI.post("/quiz/add", values);
};
const getQuiz = () => {
  return API.get("/quiz");
};

const getSingleQuiz = (id) => {
  return API.get(`/quiz/${id}`);
};

const updateQuiz = (id, values) => {
  return API.put(`/quiz/update/${id}`, values);
};
const deleteQuiz = (id) => {
  return API.delete(`/quiz/delete/${id}`);
};
const QuizService = {
  getQuiz,
  addQuiz,
  updateQuiz,
  getSingleQuiz,
  deleteQuiz,
};

export default QuizService;
