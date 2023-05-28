import { API, FAPI } from "../config/axiosConfig";

const addStudy = (values) => {
  return FAPI.post("/study/add", values);
};
const getStudy = () => {
  return API.get("/study");
};

const getSingleStudy = (id) => {
  return API.get(`/study/${id}`);
};

const updateStudy = (id, values) => {
  return FAPI.put(`/study/update/${id}`, values);
};
const deleteStudy = (id) => {
  return API.delete(`/study/delete/${id}`);
};
const StudyService = {
  getStudy,
  addStudy,
  updateStudy,
  getSingleStudy,
  deleteStudy,
};

export default StudyService;
