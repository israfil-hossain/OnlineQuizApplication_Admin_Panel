import { API } from "../config/axiosConfig";


const updateSubscription = (id,values) => {
  return API.put(`/subscription/update/${id}`, values);
};

const getSubscription =()=>{
  return API.get("/subscription");
}

const SubscriptionService = {
  updateSubscription,
  getSubscription
};

export default SubscriptionService;
