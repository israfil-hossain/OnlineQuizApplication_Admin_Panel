import { API, FAPI } from "../config/axiosConfig";


const addControl = (values) => {
  return FAPI.post("/control/add",values);
};
const getControl = () => {
  return API.get("/control");
};

const updateControl = (id, values) => {
  return FAPI.put(`/control/update/${id}`, values);
};
const deleteControl = (id) => {
  return API.delete(`/control/delete/${id}`);
};

const ControlPanelService = {
    addControl,
    getControl,
    updateControl,
    deleteControl
};

export default ControlPanelService;
